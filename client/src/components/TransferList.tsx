import { Box, Text } from "@mantine/core";
import {useLazyGetTransfersQuery} from "../api/transferApi";
import Loader from "./Loader";
import TransferListItem from "./TransferListItem";
import LazyLoader from "./LazyLoader";
import {useEffect, useState} from "react";
import {ITransfer} from "../types/sliceTypes/transfer.type";

const TransferList = () => {
  const [getTransfers, {data: newTransfers, isLoading}] = useLazyGetTransfersQuery()
  const [transfers, setTransfers] = useState<ITransfer[]>([])
  const [loadMore, setLoadMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    fetch()
  }, []);

  useEffect(() => {
    if(newTransfers?.length) {
      setTransfers(oldTransfers => [...oldTransfers, ...newTransfers])
      return
    }

    if(transfers.length) setLoadMore(false)
  }, [newTransfers]);

  const fetch = () => {
    getTransfers({page})
    setPage(prevPage => prevPage + 1)
  }

  // const showDate = (transaction: ITransaction, index: number) =>  (
  //   index === 0 || new Date(transaction.date).getDate() !== new Date(transactions![index - 1].date).getDate()
  // )

  if(isLoading) return <Loader height={"300px"}/>

  return (
    <Box mt={"md"} style={{overflowY: "auto", maxHeight: "80vh"}}>
      <LazyLoader loadMore={loadMore} fetch={fetch}>
        {
          transfers?.map(transfer => (
            <TransferListItem key={transfer.id} transfer={transfer}/>
          ))
        }
      </LazyLoader>
      {!transfers?.length && <Text align={"center"} mt={"md"}>There aren't any transfers</Text>}
    </Box>
  )
}

export default TransferList
