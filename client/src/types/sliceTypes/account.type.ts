import {AccountIconType} from "../../data/accountIcons";

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

export interface InitialStateType {
  accounts: IAccount[]
  activeAccount: IAccount
}
