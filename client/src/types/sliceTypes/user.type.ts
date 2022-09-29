export interface IUser {
  email: string
  password: string
  isActivated: string
  name: string
  currency: string
  activationLink: string
  id: string
}

export interface InitialStateType {
  user: IUser,
  isAuth: boolean | null
}
export interface AuthResponse {
  user: IUser
  refreshToken: string
  accessToken: string
}

export interface CurrencyUpdateResponse {
  user: IUser
}

export interface ApiError {
  status: number,
  data: {
    message: string
    status: number
  }
}
