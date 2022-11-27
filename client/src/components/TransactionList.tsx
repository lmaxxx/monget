import {useGetTransactionsQuery, useLazyGetTransactionsQuery} from "../api/transactionApi";
import {useAppSelector} from "../hooks/storeHooks";
import {useLocation} from "react-router-dom";
import Loader from "./Loader";
import {Stack} from "@mantine/core";
import TransactionListItem from "./TransactionListItem";
import {ITransaction} from "../types/sliceTypes/transaction.type";
import LazyLoader from "./LazyLoader";
import {useEffect, useState} from "react";


const TransactionList = () => {
  const location = useLocation()
  const {category, transactionType} = location.state
  const accountId = useAppSelector(state => state.accountSlice.activeAccount.id)
  const dateCounter = useAppSelector(state => state.transactionSlice.dateCounter)
  const activeTransactionDateRequestType = useAppSelector(state => state.transactionSlice.activeTransactionDateRequestType)
  const range = useAppSelector(state => state.transactionSlice.range)
  const [loadMore, setLoadMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [getTransactions, {data: newTransactions, isLoading}] = useLazyGetTransactionsQuery()

  useEffect(() => {
    fetch()
  }, []);

  useEffect(() => {
    if(newTransactions?.length) {
      setTransactions(oldTransactions => [...oldTransactions, ...newTransactions])
      return
    }

    if(transactions.length) setLoadMore(false)
  }, [newTransactions]);

  const fetch = () => {
    getTransactions({accountId,
      categoryId: category.id,
      transactionType,
      dateCounter,
      transactionDateRequestType: activeTransactionDateRequestType,
      range,
      page
    })

    setPage(prevPage => prevPage + 1)
  }

  const showDate = (transaction: ITransaction, index: number) =>  (
    index === 0 || new Date(transaction.date).getDate() !== new Date(transactions![index - 1].date).getDate()
  )

  if(isLoading) return <Loader width={"100%"} height={"300px"}/>

  return (
    <Stack sx={{overflowY: "auto", maxHeight: "500px", height: "100%"}}>
      <LazyLoader loadMore={loadMore} fetch={fetch}>
        {
          transactions?.map((transaction, index) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
              showDate={showDate(transaction, index)}
            />
          ))
        }
      </LazyLoader>
    </Stack>
  )
}

export default TransactionList
