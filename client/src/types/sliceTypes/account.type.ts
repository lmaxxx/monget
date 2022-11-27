import {AccountIconType} from "../../data/accountIcons";
import {ComponentPropsWithoutRef} from "react";

export interface InitialStateType {
  accounts: IAccount[]
  activeAccount: IAccount
}

export interface IAccount {
  currency: string
  createdAt: number,
  ownerId: string,
  accountName: string,
  iconName: AccountIconType,
  iconBackgroundColor: string
  amount: number
  id: string
}

export interface AccountCreatingFormValues {
  currency: string
  amount: number
  accountName: string
}

export interface AccountEditingFormValues {
  currency: string
  amount: number
  accountName: string
}

export interface AccountCreatingBodyParams extends AccountCreatingFormValues{
  iconName: string
  iconBackgroundColor: string
}

export interface AccountSelectItemProps extends ComponentPropsWithoutRef<"div"> {
  label: string
  value: string
  iconName: AccountIconType
  iconBackgroundColor: string
  disabled?: boolean
}

export interface AccountSelectItemOptions {
  disabled: [string | null]
}
