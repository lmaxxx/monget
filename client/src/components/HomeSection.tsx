import {Button, LoadingOverlay, Stack, Title} from '@mantine/core'
import {FC, useEffect} from 'react'
import {IconPlus} from "@tabler/icons";
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {useLazyGetTransactionsChartDataQuery} from "../api/transactionApi";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import PieChart from "./PieChart";
import HomeCategoriesList from "./HomeCategoriesList";
import {useLazyGetCategoriesQuery} from "../api/categoryApi";

interface PropsType {
  title: string
}

const HomeSection: FC<PropsType> = ({title}) => {
  const transactionType = title === "Expenses" ? TransactionType.Expenses : TransactionType.Income
  const activeAccountId = useAppSelector(state => state.accountSlice.activeAccount.id)
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const activeAccountCurrency = useAppSelector(state => state.accountSlice.activeAccount.currency)
  const dateCounter = useAppSelector(state => state.transactionSlice.dateCounter)
  const activeTransactionDateRequestType = useAppSelector(state => state.transactionSlice.activeTransactionDateRequestType)
  const chartData = useAppSelector(state => state.transactionSlice[`${transactionType}ChartData`])
  const range = useAppSelector(state => state.transactionSlice.range)
  const [getChartData, {isLoading: isTransactionsFetching}] = useLazyGetTransactionsChartDataQuery()
  const [getCategories, {isLoading: isCategoriesLoading}] = useLazyGetCategoriesQuery()
  const isLoading = isTransactionsFetching || isCategoriesLoading

  useEffect(() => {
    if (activeAccountId && transactionType && activeTransactionDateRequestType && range[0] && range[1]) {
      getChartData({
        accountId: activeAccountId,
        transactionType,
        dateCounter,
        transactionDateRequestType: activeTransactionDateRequestType,
        range
      })
    }

    if (!categories.length) getCategories(transactionType)
  }, [activeAccountId, transactionType, dateCounter, activeTransactionDateRequestType, range[1]]);

  return (
    <Stack align={"center"} sx={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Title align={"center"}>{title}</Title>
      <Stack sx={{height: "45vh", width: "100%"}}>
        <PieChart transactionType={transactionType} data={chartData}/>
      </Stack>
      <Button
        component={Link}
        to={`/transaction/create/${activeAccountId}`}
        state={{transactionType: title.toLowerCase(), accountCurrency: activeAccountCurrency}}
        size={"sm"}
        color={"green"}
        leftIcon={<IconPlus/>}
      >Create new transaction</Button>
      <HomeCategoriesList transactionType={transactionType}/>
    </Stack>
  )
}

export default HomeSection
