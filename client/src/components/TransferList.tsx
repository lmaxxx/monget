import { Box, Text } from "@mantine/core";
import {useGetTransfersQuery} from "../api/transferApi";
import Loader from "../ui/Loader";
import TransferListItem from "./TransferListItem";

const TransferList = () => {
  const {data: transfers, isLoading} = useGetTransfersQuery()

  if(isLoading) return <Loader height={"300px"}/>

  return (
    <Box style={{overflowY: "auto", maxHeight: "80vh"}}>
      {
        transfers?.map(transfer => (
          <TransferListItem key={transfer.id} transfer={transfer}/>
        ))
      }
      {!transfers?.length && <Text align={"center"} mt={"md"}>There aren't any transfers</Text>}
    </Box>
  )
}

export default TransferList
