CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone,
	"name" varchar,
	"userId" integer,
	"food" integer DEFAULT 0 NOT NULL,
	"wood" integer DEFAULT 0 NOT NULL,
	"steel" integer DEFAULT 0 NOT NULL,
	"fuel" integer DEFAULT 0 NOT NULL,
	"diamond" integer DEFAULT 0 NOT NULL,
	"regionId" integer,
	"allianceId" integer,
	CONSTRAINT "accounts_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "alliances" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone,
	"chatId" integer,
	"regionId" integer,
	"ownerId" integer
);
--> statement-breakpoint
CREATE TABLE "chat-messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text,
	"chatId" integer,
	"authorId" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone,
	"chatId" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"telegramId" varchar,
	"token" varchar,
	"currentAccountId" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone,
	"deletedAt" timestamp with time zone,
	CONSTRAINT "users_telegramId_unique" UNIQUE("telegramId"),
	CONSTRAINT "users_token_unique" UNIQUE("token")
);
