import { readItems } from "@directus/sdk";
import { directus } from "../directus";

type CheckAuthTokenResponse = {
    success: boolean;
    user?: {
        telegramId: number;
        username: string;
        authToken: string;
    };
    error?: string;
}

export async function checkAuthToken(token: string, userId: number): Promise<CheckAuthTokenResponse> {
    const telegramId = Number(userId);

    if (!token || !telegramId) {
        return { 
            success: false, 
            error: 'Токен или ID пользователя не предоставлен' 
        };
    }

    const tokensData = await directus.request(readItems('psre_auth_tokens', {
        filter: {
            id: { _eq: token },
            telegramId: { _eq: telegramId },
            verify: { _eq: true },
        },
    }));

    const tokenData = tokensData[0];
   
    if (!tokenData) {
        return { 
            success: false, 
            error: 'Неверный токен авторизации' 
        };
    }

    return {
        success: true,
        user: {
            telegramId: tokenData.telegramId,
            username: tokenData.username,
            authToken: tokenData.id,
        }
    };
}