import { apiClient, type ApiResponse } from "@/services/api"
import { AUTH_STORAGE_KEY } from "./auth.constants"

export interface TelegramUser {
  userId: string
  authToken: string
}

export interface AuthData {
  user: TelegramUser
  timestamp: number
}

export interface AuthVerifyResponse {
  authToken: string
  userId: string
}

export interface AuthCheckRequest {
  token: string
  userId: string
}

export interface AuthVerifyRequest {
  code: string
}

export class AuthService {
  getAuthDataFromLocalStorage() {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
      if (!storedAuth) return false
      const authData: AuthData = JSON.parse(storedAuth)
      return authData?.user
    } catch (error) {
      console.error("Error getting auth data from localStorage:", error)
      return false
    }
  }

  setAuthDataToLocalStorage(authData: AuthData) {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
    } catch (error) {
      console.error("Error saving auth data to localStorage:", error)
    }
  }

  removeAuthDataFromLocalStorage() {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch (error) {
      console.error("Error removing auth data from localStorage:", error)
    }
  }

  getAuthToken() {
    const authData = this.getAuthDataFromLocalStorage()
    if (!authData) return null
    return authData?.authToken || null
  }

  getUserId() {
    const authData = this.getAuthDataFromLocalStorage()
    if (!authData) return null
    return authData?.userId || null
  }

  async checkToken(): Promise<ApiResponse> {
    console.log("🔍 Checking token via HTTP API")
    const authData = this.getAuthDataFromLocalStorage()
    if (!authData) {
      console.log("🔍 No auth data found")
      return null
    }
    return apiClient.post("/auth/telegram/check", {
      token: authData.authToken,
      userId: authData.userId,
    })
  }

  async verifyCode(code: string): Promise<ApiResponse<AuthVerifyResponse>> {
    console.log("🔍 Verifying authorization code")
    const result = await apiClient.post<AuthVerifyResponse>("/auth/telegram/verify", { code })

    if (result.success && result.data) {
      const authInfo: AuthData = {
        user: result.data,
        timestamp: Date.now(),
      }

      // Сохраняем авторизационные данные
      this.setAuthDataToLocalStorage(authInfo)
      console.log("💾 Saved auth data for user ID:", result.data.userId)
      return { success: true }
    } else {
      return {
        success: false,
        error: result.error || "Неверный код авторизации",
      }
    }
  }

  logout() {
    this.removeAuthDataFromLocalStorage()
    console.log("🗑️ Cleared auth data")
    window.location.reload()
  }
}

export const authService = new AuthService()
