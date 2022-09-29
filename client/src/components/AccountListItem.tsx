import {Group, Text, useMantineTheme} from "@mantine/core";
import {FC} from 'react'
import {IAccount} from "../types/sliceTypes/account.type";
import AccountIcon from "./AccountIcon";
import getSymbolFromCurrency from "currency-symbol-map";
import {useNavigate} from "react-router-dom";
import AccountService from "../services/accountService";

interface PropsType {
  account: IAccount
}

const AccountListItem: FC<PropsType> = ({account}) => {
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const redirect = () => navigate(`/account/${account.id}`)

  return (
    <Group onClick={redirect} position={"apart"} p={"sm"} mb={"md"} sx={{
      width: "100%",
      transition: ".2s",
      borderRadius: ".5rem",
      cursor: "pointer",
      border: `1px solid ${theme.colors.gray[4]}`,
      "&:hover": {
        border: `1px solid ${theme.colors.gray[5]}`,
        backgroundColor: theme.colors.gray[0],
      }
    }}>
      <Group>
        <AccountIcon size={"2rem"} iconName={account.iconName} backgroundColor={account.iconBackgroundColor} />
        <Text size={"lg"}>{account.accountName}</Text>
      </Group>
      <Text size={"lg"}>{AccountService.getFormattedAmount(account.amount, account.currency)}</Text>
    </Group>
  )
}

export default AccountListItem


