import {
  IconCash,
  IconWallet,
  IconPig,
  IconCurrencyDollar,
  IconCurrencyPound,
  IconCurrencyEuro,
  IconBrandPaypal,
  IconBuildingBank,
  IconCreditCard,
  IconReceiptTax,
  IconShieldLock
} from "@tabler/icons"

const accountIcons = {
  IconCash: <IconCash/>,
  IconCreditCard: <IconCreditCard/>,
  IconBuildingBank: <IconBuildingBank/>,
  IconShieldLock: <IconShieldLock/>,
  IconReceiptTax: <IconReceiptTax/>,
  IconCurrencyDollar: <IconCurrencyDollar/>,
  IconCurrencyEuro: <IconCurrencyEuro/>,
  IconCurrencyPound: <IconCurrencyPound/>,
  IconBrandPaypal: <IconBrandPaypal/>,
  IconPig: <IconPig/>,
  IconWallet: <IconWallet/>,
}

export default accountIcons
export type AccountIconType = keyof typeof accountIcons
