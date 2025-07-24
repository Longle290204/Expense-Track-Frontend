export interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>
