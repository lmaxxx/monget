import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setAccounts, setActiveAccount} from "../store/accountSlice";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  AccountCreatingFormValues, AccountEditingFormValues,
  AccountSelectItemOptions,
  AccountSelectItemProps
} from "../types/sliceTypes/account.type";
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
        amount: (value: number) => value ? null: "You need to type an amount",
        accountName:  (value: string) => value.trim().length > 2 ? null : "You need to type an account name"
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
        amount: (value: number) => value ? null: "You need to type an amount",
        accountName:  (value: string) => value.trim().length ? null : "You need to type an account name"
      }
    }
  }

  setAccounts({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
  }) {
    dispatch(setAccounts(data))
  }

  setNewActiveAccount({dispatch, accounts, deletedId}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    accounts: IAccount[]
    deletedId: string
  }) {
    const nextActiveAccount = accounts.find(account => account.id !== deletedId)

    dispatch(setActiveAccount(nextActiveAccount!.id))
  }

  getFormattedAmount(amount?: number | string, currency?: string, disableAbbreviation?: boolean) {
    if(amount === undefined || currency === undefined) return null

    if(amount.toString().length > 5 && !disableAbbreviation) {
      amount = amount.toLocaleString('en-US', {
        notation: "compact",
        compactDisplay: "short"
      })
    }

    if(amount !== parseInt(amount.toString())) amount = Number(amount).toFixed(2)

    return amount + getSymbolFromCurrency(currency)
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

  setDefaultEditForm(form: UseFormReturnType<AccountEditingFormValues>, account: IAccount) {
    form.setFieldValue("accountName", account.accountName)
    form.setFieldValue("amount", account.amount)
    form.setFieldValue("currency", account.currency)
  }

  setDefaultCreateForm(form: UseFormReturnType<AccountCreatingFormValues>, currency: string) {
    form.setFieldValue("currency", currency)
  }
}

export default new AccountService()
