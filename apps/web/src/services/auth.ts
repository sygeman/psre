import { apiClient, ApiResponse } from './api';
import { TelegramUser } from '@/stores/auth';

export interface AuthVerifyResponse {
  user: TelegramUser;
}

export interface AuthCheckRequest {
  token: string;
  userId: string;
}

export interface AuthVerifyRequest {
  code: string;
}

export class AuthService {
  /**
   * Проверка действительности токена
   */
  async checkToken(token: string, userId: string): Promise<ApiResponse> {
    console.log('🔍 Checking token via HTTP API');
    return apiClient.post('/auth/telegram/check', { token, userId });
  }

  /**
   * Верификация кода авторизации
   */
  async verifyCode(code: string): Promise<ApiResponse<AuthVerifyResponse>> {
    console.log('🔍 Verifying authorization code');
    return apiClient.post<AuthVerifyResponse>('/auth/telegram/verify', { code });
  }
}

export const authService = new AuthService(); 