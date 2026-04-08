import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

// =====================
// USER (ADMIN ONLY)
// =====================
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// =====================
// CATEGORIES (STATIC)
// =====================
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
});

// =====================
// PROJECTS VIDEO
// =====================
export const projectsVideo = pgTable('projects_video', {
  id: serial('id').primaryKey(),

  title: varchar('title', { length: 255 }).notNull(),

  description: text('description'),

  videoUrl: text('video_url').notNull(),

  thumbnail: text('thumbnail'),

  categoryId: integer('category_id')
    .references(() => categories.id)
    .notNull(),

  isPublished: boolean('is_published').default(true),

  createdAt: timestamp('created_at').defaultNow(),
});
