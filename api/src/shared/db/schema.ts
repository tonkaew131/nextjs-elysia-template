import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const user = pgTable(
    'user',
    {
        id: text().primaryKey(),

        email: text().notNull(),
        password: text().notNull(),
    },
    (table) => [uniqueIndex('user_email_key').on(sql`LOWER(${table.email})`)]
);

export const session = pgTable('session', {
    id: text().primaryKey(),
    userId: text()
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp({
        withTimezone: true,
        mode: 'date',
    }).notNull(),
});
