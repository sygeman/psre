export const ACCOUNT_EVENTS = {
  CREATE: "account/create",
  RENAME: "account/rename"
} as const;

export const ACCOUNT_FUNCTION_IDS = {
  CREATE_HANDLER: "account-create-handler",
  RENAME_HANDLER: "account-rename-handler",
} as const;
