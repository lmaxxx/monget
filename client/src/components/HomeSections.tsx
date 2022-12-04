import {Box, SimpleGrid} from "@mantine/core";
import HomeSection from "./HomeSection";
import HomeSectionSwitch from "./HomeSectionSwitch";
import {useMediaQuery} from "@mantine/hooks";
import {useAppSelector} from "../hooks/storeHooks";
import {TransactionType} from "../types/sliceTypes/transaction.type";

const HomeSections = () => {
  const isTablet = useMediaQuery('(max-width: 900px)');
  const activeTransactionType = useAppSelector(state => state.transactionSlice.activeTransactionType)

  return (
    <Box mt={"md"}>
      {isTablet && <HomeSectionSwitch/>}
      <SimpleGrid mt={"1.5rem"} cols={isTablet ? 1 : 2}>
        {activeTransactionType === TransactionType.Expenses && isTablet && <HomeSection title={"Expenses"}/>}
        {activeTransactionType === TransactionType.Income && isTablet && <HomeSection title={"Income"}/>}
        {!isTablet &&
          <>
            <HomeSection title={"Expenses"}/>
            <HomeSection title={"Income"}/>
          </>
        }
      </SimpleGrid>
    </Box>
  )
}

export default HomeSections
