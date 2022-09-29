import {AccountIconName} from "../ui.type";

export interface IAccount {
  currency: string
  createdAt: number,
  ownerId: string,
  accountName: string,
  iconName: AccountIconName,
  iconBackgroundColor: string
  amount: number
  id: string
}

export interface InitialStateType {
  accounts: IAccount[]
  activeAccount: IAccount
}
