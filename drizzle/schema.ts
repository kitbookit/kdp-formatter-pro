import { mysqlTable, varchar, int, timestamp, text, boolean } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  openId: varchar('open_id', { length: 255 }),
  credits: int('credits').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const formattedDocuments = mysqlTable('formatted_documents', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 50 }).notNull(),
  trimSize: varchar('trim_size', { length: 50 }).notNull(),
  downloadUrl: text('download_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const payments = mysqlTable('payments', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  amount: int('amount').notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  stripeSessionId: varchar('stripe_session_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type InsertPayment = typeof payments.$inferInsert;

export const projects = mysqlTable('projects', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const bookCovers = mysqlTable('book_covers', {
  id: varchar('id', { length: 255 }).primaryKey(),
  projectId: varchar('project_id', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type InsertBookCover = typeof bookCovers.$inferInsert;

export const projectImages = mysqlTable('project_images', {
  id: varchar('id', { length: 255 }).primaryKey(),
  projectId: varchar('project_id', { length: 255 }).notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
