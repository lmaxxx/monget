import {Box, Text} from "@mantine/core"
import {forwardRef} from 'react'
import {ITransaction} from "../types/sliceTypes/transaction.type";
import {Link, useLocation} from "react-router-dom";
import CategoryIcon from "./CategoryIcon";
import HiddenTextStyles from "../assets/hiddenTextStyles";
import AccountService from "../services/accountService";


interface PropsType {
  showDate: boolean
  transaction: ITransaction
}

const TransactionListItem = forwardRef<HTMLAnchorElement, PropsType>(({transaction, showDate}, ref) => {
  const stringDateOptions: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
  const location = useLocation()
  const {activeAccount, category} = location.state
  const date = new Date(transaction.date).toLocaleDateString("en-US", stringDateOptions)
  const amount = transaction.convertedAmount ? transaction.convertedAmount : transaction.amount

  return (
    <>
      {showDate && <Text fw={500} color={"dimmed"}>{date}</Text>}
      <Box
        component={Link}
        to={`/transaction/${transaction.id}`}
        sx={{
          textDecoration: "none",
          color: "inherit"
        }}
        ref={ref}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "3rem auto auto",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <CategoryIcon
            backgroundSize={"3rem"}
            iconSize={"32px"}
            iconName={category.iconName}
            backgroundColor={category.iconBackgroundColor}
          />
          <Text sx={{...HiddenTextStyles}}>
            {transaction.title}
          </Text>
          <Text fw={500} sx={{justifySelf: "end"}}>
            {AccountService.getFormattedAmount(amount, activeAccount.currency)}
          </Text>
        </Box>
        {transaction.description &&
          <Text sx={{wordWrap: "break-word"}} pl={"4rem"} color={"pink"}>{transaction.description}</Text>}
      </Box>
    </>


  )
})

export default TransactionListItem
