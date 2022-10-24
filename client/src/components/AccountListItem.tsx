import {Box, Text, useMantineTheme} from "@mantine/core";
import {FC} from 'react'
import {IAccount} from "../types/sliceTypes/account.type";
import AccountIcon from "./AccountIcon";
import {useNavigate} from "react-router-dom";
import AccountService from "../services/accountService";
import HiddenTextStyles from "../assets/hiddenTextStyles";

interface PropsType {
  account: IAccount
}

const AccountListItem: FC<PropsType> = ({account}) => {
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const redirect = () => navigate(`/account/${account.id}`)

  return (
    <Box
      onClick={redirect}
      p={"xs"}
      sx={{
        width: "130px",
        height: "140px",
        borderRadius: ".5rem",
        cursor: "pointer",
        transition: ".2s",
        border: `1px solid ${theme.colors.gray[4]}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          border: `1px solid ${theme.colors.blue[4]}`,
        }
      }}
    >
      <AccountIcon
        backgroundSize={"3rem"}
        iconName={account.iconName}
        backgroundColor={account.iconBackgroundColor}
        iconSize={"2rem"}
      />
      <Text
        align={"center"}
        pt={"md"}
        sx={{...HiddenTextStyles, width: "100%"}}
        size={"lg"}
      >{account.accountName}</Text>
      <Text
        align={"center"}
        color={"grey"}
        sx={{...HiddenTextStyles, width: "100%"}}
        size={"md"}
      >{AccountService.getFormattedAmount(account.amount, account.currency)}</Text>
    </Box>
  )
}

export default AccountListItem
