import { readItems } from "@directus/sdk";
import { directus } from "../directus";

type CheckAuthTokenResponse = {
    success: boolean;
    user?: {
        userId: string;
        authToken: string;
    };
    error?: string;
}

export async function checkAuthToken(token: string, userId: string): Promise<CheckAuthTokenResponse> {
    if (!token || !userId) {
        return { 
            success: false, 
            error: 'Токен или ID пользователя не предоставлен' 
        };
    }

    const tokensData = await directus.request(readItems('psre_auth_tokens', {
        filter: {
            id: { _eq: token },
            user: { _eq: userId },
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
            userId: tokenData.user,
            authToken: tokenData.id,
        }
    };
}