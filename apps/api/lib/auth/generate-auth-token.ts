import { createItem } from "@directus/sdk";
import { directus } from "../directus";
import crypto from 'node:crypto';

const generate8DigitCode = () => crypto.randomInt(10000000, 99999999).toString();

export async function generateAuthToken(telegramId: number, username: string): Promise<string> {
    const code = generate8DigitCode();
    await directus.request(createItem('psre_auth_tokens', { code, telegramId, username }));
    return code;
}
  