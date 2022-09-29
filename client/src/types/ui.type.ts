import {ComponentPropsWithoutRef, ReactNode} from "react";

export interface CurrencySelectItemProps extends ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  value: string;
}

export interface AccountSelectItemProps extends ComponentPropsWithoutRef<"div"> {
  label: string
  value: string
  iconName: AccountIconName
  iconBackgroundColor: string
}

export interface ILink {
  label: string
  icon: ReactNode
  path: string
}

export type AccountIconName = "cash" | "card" | "bank" | "shield"
  | "percent" | "dollar" | "euro" | "pound" | "payPal" | "pig" | "wallet"

export enum HomeSwitchValue {
  Expenses = "expenses", Income = "income"
}
