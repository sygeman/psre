import { createStore } from 'solid-js/store';
import { API_BASE_URL, AUTH_STORAGE_KEY } from '@/constants/app';

export interface TelegramUser {
  userId: string;
  authToken: string;
}

export interface AuthData {
  user: TelegramUser;
  timestamp: number;
}

interface AuthState {
  isAuthorized: boolean;
  isLoading: boolean;
  userInfo: TelegramUser | null;
}

// Создаем store
const [authState, setAuthState] = createStore<AuthState>({
  isAuthorized: false,
  isLoading: true,
  userInfo: null,
});

// Функция проверки статуса авторизации
const checkAuthStatus = async (): Promise<boolean> => {
  setAuthState('isLoading', true);
  
  try {
    // Проверяем авторизацию из localStorage
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    
    if (!storedAuth) {
      console.log('🔍 No stored auth found');
      setAuthState('isAuthorized', false);
      return false;
    }

    const authData: AuthData = JSON.parse(storedAuth);
    
    // Проверяем токен через HTTP API
    console.log('🔍 Checking stored token via HTTP');
    const response = await fetch(`${API_BASE_URL}/auth/telegram/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        token: authData.user.authToken,
        userId: authData.user.userId 
      }),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Stored token is valid');
      console.log('📋 User ID:', authData.user.userId);
      setAuthState({
        isAuthorized: true,
        userInfo: authData.user,
      });
      return true;
    } else {
      console.log('❌ Stored token is invalid, removing');
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setAuthState('isAuthorized', false);
      return false;
    }
  } catch (error) {
    console.log('❌ Error checking auth status:', error);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState('isAuthorized', false);
    return false;
  } finally {
    setAuthState('isLoading', false);
  }
};

// Функция верификации кода
const verifyCode = async (code: string): Promise<{ success: boolean; error?: string }> => {
  if (!code.trim()) {
    return { success: false, error: 'Введите код авторизации' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/telegram/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code.trim() })
    });

    const data = await response.json();

    if (data.success) {
      const authInfo: AuthData = {
        user: data.user,
        timestamp: Date.now()
      };
      
      // Сохраняем авторизационные данные
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authInfo));
      
      console.log('💾 Saved auth data for user ID:', data.user.userId);
      
      setAuthState({
        isAuthorized: true,
        userInfo: data.user,
      });
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Неверный код авторизации' };
    }
  } catch (error) {
    console.error('Ошибка верификации:', error);
    return { success: false, error: 'Ошибка соединения с сервером' };
  }
};

// Функция выхода
const logout = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  setAuthState({
    isAuthorized: false,
    userInfo: null,
  });
  console.log('🗑️ Cleared auth data');
};

// Геттеры для текущих данных пользователя
const getCurrentUser = (): TelegramUser | null => authState.userInfo;
const getAuthToken = (): string | null => authState.userInfo?.authToken || null;
const getUserId = (): string | null => authState.userInfo?.userId || null;

// Функция инициализации store
const initAuthStore = () => {
  if (typeof window !== 'undefined') {
    checkAuthStatus();
  }
};

export const authStore = {
  // Store для доступа к состоянию
  get isAuthorized() { return authState.isAuthorized; },
  get isLoading() { return authState.isLoading; },
  get userInfo() { return authState.userInfo; },
  
  // Функции управления
  checkAuthStatus,
  verifyCode,
  logout,
  initAuthStore,
  
  // Геттеры
  getCurrentUser,
  getAuthToken,
  getUserId,
}; 