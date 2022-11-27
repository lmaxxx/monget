import {FC} from 'react'
import {useGetTransactionsQuery} from "../api/transactionApi";
import {useAppSelector} from "../hooks/storeHooks";
import {useLocation} from "react-router-dom";
import Loader from "./Loader";
import {Stack} from "@mantine/core";
import TransactionListItem from "./TransactionListItem";
import {ITransaction} from "../types/sliceTypes/transaction.type";

interface PropsType {

}

const TransactionList: FC<PropsType> = () => {
  const location = useLocation()
  const {category, transactionType} = location.state
  const accountId = useAppSelector(state => state.accountSlice.activeAccount.id)
  const dateCounter = useAppSelector(state => state.transactionSlice.dateCounter)
  const activeTransactionDateRequestType = useAppSelector(state => state.transactionSlice.activeTransactionDateRequestType)
  const range = useAppSelector(state => state.transactionSlice.range)
  const {data: transactions, isLoading} = useGetTransactionsQuery({
    accountId,
    categoryId: category.id,
    transactionType,
    dateCounter,
    transactionDateRequestType: activeTransactionDateRequestType,
    range,
  })

  const showDate = (transaction: ITransaction, index: number) => (
    index === 0 || new Date(transaction.date).getUTCDate() !== new Date(transactions![index - 1].date).getUTCDate()
  )

  if(isLoading) return <Loader width={"100%"} height={"300px"}/>

  return (
    <Stack sx={{overflowY: "auto", maxHeight: "500px", height: "100%"}}>
      {
        transactions?.map((transaction, index) => (
          <TransactionListItem
            key={transaction.id}
            transaction={transaction}
            showDate={showDate(transaction, index)}
          />
        ))
      }
    </Stack>
  )
}

export default TransactionList
