ALTER TABLE "user" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_key" ON "user" USING btree (LOWER("email"));