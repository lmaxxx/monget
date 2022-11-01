import {SimpleGrid} from "@mantine/core";
import HomeSection from "./HomeSection";
import HomeSectionSwitch from "./HomeSectionSwitch";
import {useMediaQuery} from "@mantine/hooks";
import {useAppSelector} from "../hooks/storeHooks";
import {TransactionType} from "../types/sliceTypes/transaction.type";

const HomeSections = () => {
  const isTablet = useMediaQuery('(max-width: 900px)');
  const activeTransactionType = useAppSelector(state => state.transactionSlice.activeTransactionType)

  if(isTablet) {
    return (
      <>
        <HomeSectionSwitch/>
        <SimpleGrid cols={1}>
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
