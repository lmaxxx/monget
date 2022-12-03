import {ComponentPropsWithoutRef} from "react";

export interface InitialStateType {
  user: IUser,
  isAuth: boolean | null
}

export interface IUser {
  email: string
  password: string
  isActivated: string
  name: string
  currency: string
  activationLink: string
  id: string
}

export interface AuthResponse {
  user: IUser
  refreshToken: string
  accessToken: string
}

export interface CurrencyUpdateResponse {
  user: IUser
}

export interface CurrencySelectItemProps extends ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  value: string;
}

export interface CurrencyRegistrationFormValues {
  currency: string
}

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

export interface UpdateEmailFromValues {
  email: string
}
