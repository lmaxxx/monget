import {FC} from 'react'
import {PieSection, TransactionType} from "../types/sliceTypes/transaction.type";
import {useAppSelector} from "../hooks/storeHooks";
import CategoryService from "../services/categoryService";
import CategoryIcon from "./CategoryIcon";
import AccountService from "../services/accountService";
import {Box, Text} from '@mantine/core'
import HiddenTextStyles from "../assets/hiddenTextStyles";
import {Link} from "react-router-dom";

interface PropsType {
  transactionType: TransactionType
  chartSection: PieSection
}

const HomeCategoriesListItem: FC<PropsType> = ({transactionType, chartSection}) => {
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)
  const category = CategoryService.getCategoryById(categories, chartSection.id)!
  const chartData = useAppSelector(state => state.transactionSlice[`${transactionType}ChartData`])
  const chartDataValue = chartData.reduce((prev, next) => prev + next.value, 0)

  return (
    <Box
      component={Link}
      state={{amount: chartSection.value, category, transactionType, activeAccount}}
      to={`/transactions/${activeAccount.id}`}
      sx={{
        display: "grid",
        gridTemplateColumns: "3rem 100px 45px auto",
        alignItems: "center",
        gap: "1rem",
        textDecoration: "none",
        color: "inherit"
      }}>
      <CategoryIcon
        backgroundSize={"3rem"}
        iconSize={"32px"}
        iconName={category?.iconName || "IconCash"}
        backgroundColor={category?.iconBackgroundColor || "#ccc"}
      />
      <Text sx={{...HiddenTextStyles}}>
        {category?.name || "Loading..."}
      </Text>
      <Text color={"gray"} sx={{justifySelf: "end"}}>
        {CategoryService.getPercentOfCategory(chartDataValue, chartSection.value)}
      </Text>
      <Text fw={500} sx={{justifySelf: "end"}}>
        {AccountService.getFormattedAmount(chartSection.value, activeAccount.currency)}
      </Text>
    </Box>
  )
}

export default HomeCategoriesListItem
