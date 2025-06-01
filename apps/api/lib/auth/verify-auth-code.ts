import { readItems, updateItem } from "@directus/sdk";
import { directus } from "../directus";

type VerifyAuthCodeResponse = { 
    success: boolean;
    user?: {
        telegramId: number;
        username: string;
        authToken: string;
    };
    error?: string;
}

export async function verifyAuthCode(code: string): Promise<VerifyAuthCodeResponse> {
    if (!code) {
        return { 
            success: false, 
            error: 'Код не предоставлен' 
        };
    }

    const tokensData = await directus.request(readItems('psre_auth_tokens', {
        filter: {
            code: { _eq: code },
            verify: { _eq: false },
        },
    }));

    const tokenData = tokensData[0];

    if (!tokenData) {
        return { 
            success: false, 
            error: 'Неверный код авторизации' 
        };
    }

    await directus.request(updateItem('psre_auth_tokens', tokenData.id, {
        code: null,
        verify: true,
    }));


    return {
        success: true,
        user: {
            telegramId: tokenData.telegramId,
            username: tokenData.username,
            authToken: tokenData.id,
        }
    };
}