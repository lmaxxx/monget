import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setAuth, setUser} from "../store/userSlice";
import {IUser} from "../types/sliceTypes/user.type";
import {MutableRefObject,} from "react";

class AuthService {
  getLoginFormConfig() {
    return {
      initialValues: {
        email: '',
        password: '',
      },
      validate: {
        email: (value: string) => (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
          ? null : 'Invalid email'),
        password: (value: string) => value.trim().length >= 8 ? null : "Password must be least 8 chars long"
      }
    }
  }

  getRegistrationFormConfig(passportInputRef: MutableRefObject<HTMLInputElement | undefined>) {
    return {
      initialValues: {
        email: '',
        name: '',
        password: '',
        repeatPassword: ''
      },
      validate: {
        email: (value: string) => (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
          ? null : 'Invalid email'),
        name: (value: string) => value.trim().length >= 3 ? null : "Name must be least 3 chars long",
        password: (value: string) => value.trim().length >= 8 ? null : "Password must be least 8 chars long",
        repeatPassword: (value: string) => value === passportInputRef?.current?.value ? null : "Passwords must be the same"
      }
    }
  }

  getUpdatingEmailFormConfig(activeEmail: string) {
    return {
      initialValues: {
        email: ""
      },
      validate: {
        email: (value: string) => {
          if (value === activeEmail) return "You should type new email"
          if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))
            return "InvalidEmail"

          return null
        }
      }
    }
  }

  getCurrencyRegistrationFormConfig(defaultCurrency?: string) {
    return {
      initialValues: {
        currency: defaultCurrency || ""
      },
      validate: {
        currency: (value: string) => value.trim().length === 3 ? null : "You need to choose currency"
      }
    }
  }

  async updateUserData({dispatch, data, isNewUser}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
    isNewUser: boolean
  }) {
    try {
      dispatch(setUser(data.user))
      dispatch(setAuth(true))

      if (isNewUser) {
        localStorage.setItem("token", data.accessToken)
      }
    } catch (err) {
    } // catch errors in component
  }

  async deleteUserData(dispatch: ThunkDispatch<any, any, AnyAction>) {
    try {
      localStorage.removeItem("token")
      dispatch(setUser({} as IUser))
      dispatch(setAuth(false))
    } catch (err) {
    } // catch errors in component
  }
}

export default new AuthService()
