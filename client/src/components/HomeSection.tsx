import {Button, Stack, Title} from '@mantine/core'
import {FC} from 'react'
import PieChartWithoutData from "./PieChartWithoutData";
import {IconPlus} from "@tabler/icons";
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {useGetTransactionsQuery} from "../api/transactionApi";
import {TransactionType} from "../types/sliceTypes/transaction.type";

interface PropsType {
  title: string
}

const HomeSection: FC<PropsType> = ({title}) => {
  const activeAccountId = useAppSelector(state => state.accountSlice.activeAccount.id)
  const dateCounter = useAppSelector(state => state.transactionSlice.dateCounter)
  const activeTransactionDateRequestType = useAppSelector(state => state.transactionSlice.activeTransactionDateRequestType)
  const transactionType = title === "Expenses" ? TransactionType.Expenses : TransactionType.Income
  const dataForDonut = useAppSelector(state => state.transactionSlice[`${transactionType}DataForDonut`])
  useGetTransactionsQuery(
    {
      accountId: activeAccountId,
      transactionType,
      dateCounter,
      transactionDateRequestType: activeTransactionDateRequestType
    },
    {refetchOnMountOrArgChange: true})

  console.log(dataForDonut)

  return (
    <Stack align={"center"}>
      <Title align={"center"}>{title}</Title>
      <Stack sx={{height: "45vh", width: "100%"}}>
        <PieChartWithoutData/>
      </Stack>
      <Button
        component={Link}
        to={`/transaction/create/${activeAccountId}`}
        state={{transactionType: title.toLowerCase()}}
        size={"sm"}
        color={"green"}
        leftIcon={<IconPlus/>}
      >Create new transaction</Button>
    </Stack>
  )
}

export default HomeSection
