import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: text().primaryKey(),
});

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
