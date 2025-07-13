export interface RegisterFormData {
  username: string
  email: string
  password: string
  rePassword: string
}

export type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>
