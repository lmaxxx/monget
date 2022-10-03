export interface RegistrationFormValues {
  email: string
  name: string
  password: string
  repeatPassword: string
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface CurrencyRegistrationFormValues {
  currency: string
}

export interface AccountCreatingFormValues {
  currency: string
  amount: number
  accountName: string
  iconName: string
  iconBackgroundColor: string
}