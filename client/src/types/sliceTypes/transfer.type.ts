import {IAccount} from "./account.type";

export interface ITransfer {
  userId: string
  from: IAccount
  to: IAccount
  amount: number
  createdAt: number
  id: string
}

export interface TransferCreatingFormValues {
  from: string
  to: string
  amount: number
}

export interface GetTransfersParamsType {
  page?: number
}
