import {Button, Stack, Title} from '@mantine/core'
import {FC, useEffect} from 'react'
import {IconPlus} from "@tabler/icons";
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {useLazyGetTransactionsChartDataQuery} from "../api/transactionApi";
import {TransactionDateRequestType, TransactionType} from "../types/sliceTypes/transaction.type";
import PieChart from "./PieChart";

interface PropsType {
  title: string
}

const HomeSection: FC<PropsType> = ({title}) => {
  const activeAccountId = useAppSelector(state => state.accountSlice.activeAccount.id)
  const dateCounter = useAppSelector(state => state.transactionSlice.dateCounter)
  const activeTransactionDateRequestType = useAppSelector(state => state.transactionSlice.activeTransactionDateRequestType)
  const transactionType = title === "Expenses" ? TransactionType.Expenses : TransactionType.Income
  const chartData = useAppSelector(state => state.transactionSlice[`${transactionType}ChartData`])
  const range = useAppSelector(state => state.transactionSlice.range)
  const [getChartData] = useLazyGetTransactionsChartDataQuery()

  useEffect(() => {
    if(activeAccountId && transactionType && dateCounter && activeTransactionDateRequestType && range[0] && range[1]) {
        getChartData({
          accountId: activeAccountId,
          transactionType,
          dateCounter,
          transactionDateRequestType: activeTransactionDateRequestType
        })
    }
  }, [activeAccountId, transactionType, dateCounter, activeTransactionDateRequestType]);

  return (
    <Stack align={"center"}>
      <Title align={"center"}>{title}</Title>
      <Stack sx={{height: "45vh", width: "100%"}}>
        <PieChart data={chartData}/>
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
