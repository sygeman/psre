// Общие типы для всех приложений
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
} 