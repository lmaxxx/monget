import {PieSection, TransactionType} from "../types/sliceTypes/transaction.type";
import {FC} from "react";
import {useAppSelector} from "../hooks/storeHooks";
import CategoryService from "../services/categoryService";
import {Group, Box, Text} from '@mantine/core'
import AccountService from "../services/accountService";

interface PropsType {
  data: PieSection
  transactionType: TransactionType
}

const PieTooltip: FC<PropsType> = ({data: {id, value, color}, transactionType}) => {
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const category = CategoryService.getCategoryById(categories, id)!
  const activeAccountCurrency = useAppSelector(state => state.accountSlice.activeAccount.currency)

  return (
    <Group
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow: "1px 1px 6px 0px rgba(58,58,58,0.81)"
      }}
      px={"xs"}
      spacing={"xs"}
    >
      <Box sx={{backgroundColor: color, height: "1rem", width: "1rem"}}/>
      <Text>{category.name}: {AccountService.getFormattedAmount(value, activeAccountCurrency, true)}</Text>
    </Group>
  )
}

export default PieTooltip
