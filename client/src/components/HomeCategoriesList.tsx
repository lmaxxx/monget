import {Stack} from "@mantine/core";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {FC} from "react";
import {useAppSelector} from "../hooks/storeHooks";
import HomeCategoriesListItem from "./HomeCategoriesListItem";

interface PropsType {
  transactionType: TransactionType
}

const HomeCategoriesList: FC<PropsType> = ({transactionType}) => {
  const chartData = useAppSelector(state => state.transactionSlice[`${transactionType}ChartData`])

  return (
    <Stack w={"300px"} mt={"sm"}>
      {
        chartData.map(chartSection => (
          <HomeCategoriesListItem transactionType={transactionType} key={chartSection.id} chartSection={chartSection}/>
        ))
      }
    </Stack>
  )
}

export default HomeCategoriesList
