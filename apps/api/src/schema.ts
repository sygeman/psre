import { builder } from "@psre/tools";
import { buildChatModule } from "@psre/chat/api";
import { buildResourcesModule } from "@psre/resources/api";

buildChatModule();
buildResourcesModule();

export const schema = builder.toSchema();
