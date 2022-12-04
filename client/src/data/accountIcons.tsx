import {
  IconBrandPaypal,
  IconBuildingBank,
  IconCash,
  IconCreditCard,
  IconCurrencyDollar,
  IconCurrencyEuro,
  IconCurrencyPound,
  IconPig,
  IconReceiptTax,
  IconShieldLock,
  IconWallet
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
