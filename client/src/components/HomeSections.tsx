import {SimpleGrid} from "@mantine/core";
import HomeSection from "./HomeSection";
import HomeSectionSwitch from "./HomeSectionSwitch";
import {useMediaQuery} from "@mantine/hooks";
import {useAppSelector} from "../hooks/storeHooks";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {useLazyGetTransactionsQuery} from "../api/transactionApi";
import {useEffect} from "react";

const HomeSections = () => {
  const isTablet = useMediaQuery('(max-width: 900px)');
  const activeTransactionType = useAppSelector(state => state.transactionSlice.activeTransactionType)
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)
  const incomeTransactions = useAppSelector(state => state.transactionSlice.incomeTransactions)
  const [getTransactions] = useLazyGetTransactionsQuery()

  useEffect(() => {
    if(activeAccount.id) getTransactions({accountId: activeAccount.id, transactionType: TransactionType.Income})
  }, [activeAccount]);

  console.log(incomeTransactions)

  if(isTablet) {
    return (
      <>
        <HomeSectionSwitch/>
        <SimpleGrid mt={"1.5rem"} cols={1}>
          {activeTransactionType === TransactionType.Expenses && <HomeSection title={"Expenses"}/>}
          {activeTransactionType === TransactionType.Income && <HomeSection title={"Income"}/>}
        </SimpleGrid>
      </>
    )
  }

  return (
    <>
      <SimpleGrid cols={2}>
        <HomeSection title={"Expenses"}/>
        <HomeSection title={"Income"}/>
      </SimpleGrid>
    </>
  )
}

export default HomeSections
