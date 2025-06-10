import { builder } from "@psre/gql-tools";
import { buildChatModule } from "@psre/chat/api";

buildChatModule();

export const schema = builder.toSchema();
