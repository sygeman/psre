CREATE TABLE "alliances" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone,
	"chatId" integer
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone,
	"chatId" integer
);
