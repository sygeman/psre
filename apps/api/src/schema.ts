import { printSchema } from "graphql";
import { builder } from "./lib/builder";
import { buildChatModule } from "./modules/chat";
import { buildResourcesModule } from "./modules/resources";

buildChatModule();
buildResourcesModule();

export const schema = builder.toSchema();

await Bun.write("schema.gql", printSchema(schema));
