import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setAccounts} from "../store/accountSlice";
import getSymbolFromCurrency from "currency-symbol-map";
import {AccountIconName} from "../types/ui.type";
import accountsIcons from "../data/accountIcons";
import {ElementType} from 'react'

class AccountService {
  getAccountCreatingFormConfig() {
    return {
      initialValues: {
        accountName: "",
        amount: "",
        currency: ""
      },
      validate: {
        currency: (value: string) => value.trim().length === 3 ? null : "You need to choose currency",
        amount: (value: string) => typeof value === "number" ? null: "You need to type amount",
        accountName:  (value: string) => value.trim().length ? null : "You need to type account name"
      }
    }
  }

  async setAccounts({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
  }) {
    dispatch(setAccounts(data))
  }

  getFormattedAmount(amount: number | undefined, currency: string | undefined) {
    if(amount === undefined || currency === undefined) return null

    return amount.toFixed(1) + getSymbolFromCurrency(currency)
  }
}

export default new AccountService()
