import { builder } from "@psre/tools";
import { buildChatModule } from "@psre/chat/api";

buildChatModule();

export const schema = builder.toSchema();
