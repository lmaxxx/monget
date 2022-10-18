import {IAccount} from "./account.type";

export interface ITransfer {
  userId: string
  from: IAccount
  to: IAccount
  amount: number
  createdAt: number
  id: string
}