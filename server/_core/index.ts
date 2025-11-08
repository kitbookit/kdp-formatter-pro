import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import compression from "compression";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Compression middleware - Gzip/Brotli
  app.use(compression({ level: 6 }));
  
  // Caching middleware
  app.use((req, res, next) => {
    // Cache static assets for 1 year
    if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Cache HTML for 1 hour
    else if (req.url.endsWith('.html') || req.url === '/') {
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    }
    // No cache for API
    else if (req.url.startsWith('/api')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    next();
  });
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Download endpoint for formatted PDFs
  app.get('/api/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `/tmp/${fileName}`;
    
    try {
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        res.download(filePath, fileName, (err: any) => {
          if (err) console.error('Download error:', err);
          // Pulisci il file dopo il download
          fs.unlink(filePath, (err: any) => {
            if (err) console.error('Cleanup error:', err);
          });
        });
      } else {
        res.status(404).json({ error: 'File not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Download failed' });
    }
  });
  
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`[Server] Running on http://localhost:${port}/`);
    console.log(`[Performance] ✓ Compression enabled (Gzip/Brotli)`);
    console.log(`[Performance] ✓ Caching configured`);
    console.log(`[Performance] ✓ Static assets: 1 year cache`);
    console.log(`[Performance] ✓ HTML: 1 hour cache`);
  });
}

startServer().catch(console.error);
