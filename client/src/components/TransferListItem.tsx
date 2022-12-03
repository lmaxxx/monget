import {forwardRef} from "react"
import {ITransfer} from "../types/sliceTypes/transfer.type";
import {Group, Stack, Text} from "@mantine/core";
import AccountIcon from "./AccountIcon";
import AccountService from "../services/accountService";

interface PropsType {
  transfer: ITransfer
}

const TransferListItem = forwardRef<HTMLDivElement, PropsType>(({transfer}, ref) => {
  const {from, to, amount, createdAt} = transfer
  const date = new Date(createdAt)
  const options: Intl.DateTimeFormatOptions = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}

  return (
    <Stack ref={ref} style={{borderBottom: "1px solid #ccc"}} p={"sm"}>
      <Group noWrap>
        <Text>From:</Text>
        <AccountIcon iconName={from.iconName} backgroundColor={from.iconBackgroundColor}/>
        <Text
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}
        >{from.accountName}</Text>
      </Group>
      <Group noWrap>
        <Text>To:</Text>
        <AccountIcon iconName={to.iconName} backgroundColor={to.iconBackgroundColor}/>
        <Text
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}
        >{to.accountName}</Text>
      </Group>
      <Text>Amount: {AccountService.getFormattedAmount(amount, from.currency)}</Text>
      <Text color={"gray"}>{date.toLocaleDateString("en-US", options)}</Text>
    </Stack>
  )
})

export default TransferListItem
