import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setAccounts} from "../store/accountSlice";
import getSymbolFromCurrency from "currency-symbol-map";
import {AccountSelectItemOptions, AccountSelectItemProps} from "../types/ui.type";
import accountsIcons from "../data/accountIcons";
import {ElementType} from 'react'
import {IAccount} from "../types/sliceTypes/account.type";
import {UseFormReturnType} from "@mantine/form";

class AccountService {
  getAccountCreatingFormConfig() {
    return {
      initialValues: {
        accountName: "",
        amount: 0,
        currency: ""
      },
      validate: {
        currency: (value: string) => value.trim().length === 3 ? null : "You need to choose currency",
        amount: (value: number) => value !== undefined ? null: "You need to type an amount",
        accountName:  (value: string) => value.trim().length ? null : "You need to type an account name"
      }
    }
  }

  getAccountEditingFormConfig(initialValues?: any) {
    return {
      initialValues: initialValues || {
        currency: "",
        amount: "",
        accountName: ""
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

  getAccountSelectItems(accounts: IAccount[], options?: AccountSelectItemOptions) {
    return accounts.map(account => {
      const selectItemProps: AccountSelectItemProps = {
        label: account.accountName,
        value: account.id,
        iconName: account.iconName,
        iconBackgroundColor: account.iconBackgroundColor,
      }

      if(options?.disabled.includes(account.id)) selectItemProps.disabled = true

      return selectItemProps
    })
  }

  setDefaultEditForm(form: UseFormReturnType<any, (values: any) => any>, account: IAccount) {
    form.setFieldValue("accountName", account.accountName)
    form.setFieldValue("amount", account.amount)
    form.setFieldValue("currency", account.currency)
  }

  setDefaultCreateForm(form: UseFormReturnType<any, (values: any) => any>, currency: string) {
    form.setFieldValue("currency", currency)
  }
}

export default new AccountService()
