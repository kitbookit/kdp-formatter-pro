import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  createProject,
  getUserProjects,
  getProjectById,
  createBookCover,
  getUserBookCovers,
  getBookCoverById,
  createPayment,
  updatePaymentStatus,
  getUserByOpenId,
  getDb,
} from "./db";
import { InsertPayment, users } from "../drizzle/schema";
import { createCheckoutSession } from "./stripe";
import { ENV } from "./_core/env";


export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    simpleLogin: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const testEmail = input.email;
          const openId = `test-${testEmail.replace(/[^a-z0-9]/g, '')}`;
          
          let user = await getUserByOpenId(openId);
          
          if (!user) {
            const db = await getDb();
            if (!db) throw new Error('Database not available');
            
            await db.insert(users).values({
              openId,
              name: testEmail.split('@')[0],
              email: testEmail,
              loginMethod: 'email',
              role: 'user',
              lastSignedIn: new Date(),
            });
            
            user = await getUserByOpenId(openId);
          }
          
          if (!user) throw new Error('Failed to create user');
          
          const { sdk } = await import('./_core/sdk');
          const sessionToken = await sdk.createSessionToken(user.openId, {
            name: user.name || '',
            expiresInMs: ONE_YEAR_MS,
          });
          
          const cookieOptions = getSessionCookieOptions(ctx.req);
          ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
          
          return {
            success: true,
            user,
          };
        } catch (error) {
          console.error('Simple login error:', error);
          throw new Error('Login failed');
        }
      }),
  }),

  projects: router({
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        manuscriptText: z.string().optional(),
        pageCount: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createProject(ctx.user.id, input);
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserProjects(ctx.user.id);
    }),
    getById: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return getProjectById(input);
      }),
  }),

  covers: router({
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        author: z.string(),
        design: z.object({
          title: z.string(),
          author: z.string(),
          backgroundColor: z.string(),
          textColor: z.string(),
          fontSize: z.number().optional(),
        }),
        coverImageUrl: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createBookCover(ctx.user.id, input);
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserBookCovers(ctx.user.id);
    }),
    getById: protectedProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return getBookCoverById(input);
      }),
  }),

  formatter: router({
    formatDocumentEnhanced: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileBuffer: z.array(z.number()),
        fileType: z.string(),
        options: z.object({
          trimSize: z.string().optional(),
          includePageNumbers: z.boolean().optional(),
          pageNumberPosition: z.enum(['center', 'outer', 'inner']).optional(),
          fontSize: z.number().optional(),
          fontFamily: z.enum(['serif', 'sans-serif']).optional(),
        }).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const { processDocument, validateKDPCompliance } = await import('./documentProcessorEnhanced');
          
          const fileBuffer = Buffer.from(input.fileBuffer);
          
          // Processa il documento con le opzioni
          const formattedPdf = await processDocument(
            fileBuffer,
            input.fileType,
            input.options || {}
          );
          
          // Valida il PDF generato
          const validation = await validateKDPCompliance(
            formattedPdf,
            input.options?.trimSize || '6x9'
          );
          
          // Salva il file
          const fileName = `kdp_formatted_${Date.now()}_${input.fileName}.pdf`;
          const filePath = `/tmp/${fileName}`;
          
          const fs = await import('fs');
          fs.writeFileSync(filePath, formattedPdf);
          
          const downloadUrl = `/api/download/${fileName}`;
          
          return {
            success: true,
            downloadUrl,
            fileName: `kdp_formatted_${input.fileName}.pdf`,
            validation,
          };
        } catch (error) {
          console.error('Error formatting document:', error);
          throw new Error(`Failed to format document: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }),
    
    formatDocument: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileBuffer: z.array(z.number()),
        fileType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const { applyKDPFormatting } = await import('./documentProcessor');
          
          // Converti l'array di numeri in Buffer
          const fileBuffer = Buffer.from(input.fileBuffer);
          
          // Applica la formattazione KDP
          const formattedPdf = await applyKDPFormatting(fileBuffer);
          
          // Salva il file temporaneamente
          const fileName = `formatted_${Date.now()}_${input.fileName}.pdf`;
          const filePath = `/tmp/${fileName}`;
          
          // Salva il file
          const fs = await import('fs');
          fs.writeFileSync(filePath, formattedPdf);
          
          // Genera un URL di download (in produzione useremmo S3)
          const downloadUrl = `/api/download/${fileName}`;
          
          return {
            success: true,
            downloadUrl,
            fileName: `formatted_${input.fileName}.pdf`,
          };
        } catch (error) {
          console.error('Error formatting document:', error);
          throw new Error('Failed to format document');
        }
      }),
  }),


  payments: router({
    createCheckout: protectedProcedure
      .input(z.object({
        projectId: z.number().optional(),
        amount: z.number(),
        currency: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const paymentResult = await createPayment({
            userId: ctx.user.id,
            projectId: input.projectId,
            amount: input.amount,
            currency: input.currency || 'EUR',
            status: 'pending',
          } as InsertPayment);

          const protocol = ctx.req.headers["x-forwarded-proto"] || "https";
          const host = ctx.req.headers["x-forwarded-host"] || ctx.req.headers.host || "localhost:3000";
          const baseUrl = `${protocol}://${host}`;

          const stripeSession = await createCheckoutSession({
            userId: ctx.user.id,
            projectId: input.projectId,
            amount: input.amount,
            currency: input.currency || "EUR",
            description: input.description || "KDP Formatter Pro",
            successUrl: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${baseUrl}/payment-cancelled`,
          });

          return {
            sessionId: stripeSession.id,
            url: stripeSession.url,
            paymentId: (paymentResult as any).insertId,
          };
        } catch (error) {
          console.error("Error creating checkout session:", error);
          throw new Error("Failed to create checkout session");
        }
      }),

    getSessionStatus: publicProcedure
      .input(z.object({
        sessionId: z.string(),
      }))
      .query(async ({ input }) => {
        try {
          const stripe = await import("./stripe").then(m => m.default);
          const session = await stripe.checkout.sessions.retrieve(input.sessionId);
          
          return {
            status: session.payment_status,
            customer_email: session.customer_details?.email,
            amount: session.amount_total,
            currency: session.currency,
          };
        } catch (error) {
          console.error("Error retrieving session status:", error);
          throw new Error("Failed to retrieve session status");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
