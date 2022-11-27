import {FC} from 'react'
import {useGetTransactionsQuery} from "../api/transactionApi";
import {useAppSelector} from "../hooks/storeHooks";
import {useLocation} from "react-router-dom";

interface PropsType {

}

const TransactionList: FC<PropsType> = () => {
  const location = useLocation()
  const {category, transactionType} = location.state
  const accountId = useAppSelector(state => state.accountSlice.activeAccount.id)
  const dateCounter = useAppSelector(state => state.transactionSlice.dateCounter)
  const activeTransactionDateRequestType = useAppSelector(state => state.transactionSlice.activeTransactionDateRequestType)
  const range = useAppSelector(state => state.transactionSlice.range)
  const {data: transactions} = useGetTransactionsQuery({
    accountId,
    categoryId: category.id,
    transactionType,
    dateCounter,
    transactionDateRequestType: activeTransactionDateRequestType,
    range,
  })

  console.log(transactions)

  return (
    <></>
  )
}

export default TransactionList
