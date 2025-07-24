export interface SignUpFormData {
  surName: string
  name: string
  username: string
  phoneNumber: string
  password: string
  rePassword: string
  gender?: string
}

export type SignUpErrors = Partial<Record<keyof SignUpFormData, string>>
