import {forwardRef} from "react"
import {ITransfer} from "../types/sliceTypes/transfer.type";
import {Text, Box, NumberInput} from "@mantine/core";
import {IconArrowRight} from "@tabler/icons"
import AccountIcon from "./AccountIcon";
import AccountService from "../services/accountService";
import HiddenTextStyles from '../assets/hiddenTextStyles'
import getSymbolFromCurrency from "currency-symbol-map";

interface PropsType {
  transfer: ITransfer
  showDate?: boolean
}

const TransferListItem = forwardRef<HTMLDivElement, PropsType>(({transfer, showDate}, ref) => {
  const {from, to, amount, createdAt} = transfer
  const date = new Date(createdAt)
  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'}

  return (
    <Box ref={ref} pt={"sm"}>
      {showDate && <Text mb={"xs"} color={"gray"}>{date.toLocaleDateString("en-US", options)}</Text>}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "40% 24px 40%",
        alignItems: "center",
        gridColumnGap: ".5rem"
      }}>
        <Box sx={{display: "flex", alignItems: "center", gap: ".5rem"}}>
          <AccountIcon iconName={from.iconName} backgroundColor={from.iconBackgroundColor}/>
          <Text
            sx={{...HiddenTextStyles}}
          >{from.accountName}</Text>
        </Box>
        <IconArrowRight/>
        <Box sx={{display: "flex", alignItems: "center", gap: ".5rem"}}>
          <AccountIcon iconName={to.iconName} backgroundColor={to.iconBackgroundColor}/>
          <Text
            sx={{...HiddenTextStyles}}
          >{to.accountName}</Text>
        </Box>
      </Box>
      <NumberInput
        mt={"xs"}
        precision={2}
        rightSection={getSymbolFromCurrency(from.currency)}
        value={amount}
        readOnly
        variant={"filled"}
      />
    </Box>
  )
})

export default TransferListItem
