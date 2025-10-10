import { printSchema } from "graphql";
import { builder } from "./lib/builder";
import { buildResourcesModule } from "./modules/resources";
import './modules/global'
import "./modules/chat";

buildResourcesModule();

export const schema = builder.toSchema();

await Bun.write("schema.gql", printSchema(schema));
