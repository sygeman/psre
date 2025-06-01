import { createItem, readItems, updateItem } from "@directus/sdk";
import { directus } from "../directus";

type VerifyAuthCodeResponse = { 
    success: boolean;
    user?: {
        userId: string;
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

    // Аккаунт подтвержден, создаем пользователя, если нет
    const usersData = await directus.request(readItems('psre_users', {
        filter: {
            telegram_id: { _eq: tokenData.telegramId },
        },
    }));

    let userData = usersData[0];

    if (!userData) {
        userData = await directus.request(createItem('psre_users', {
            telegram_id: tokenData.telegramId,
        }));
    }

    await directus.request(updateItem('psre_auth_tokens', tokenData.id, {
        code: null,
        verify: true,
        user: userData.id,
    }));


    return {
        success: true,
        user: {
            userId: userData.id,
            authToken: tokenData.id,
        }
    };
}