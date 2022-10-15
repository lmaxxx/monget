import {ComponentPropsWithoutRef, ReactNode} from "react";
import {AccountIconType} from "../data/accountIcons";

export interface CurrencySelectItemProps extends ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  value: string;
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

export interface ILink {
  label: string
  icon: ReactNode
  path: string
}

export enum HomeSwitchValue {
  Expenses = "expenses", Income = "income"
}
