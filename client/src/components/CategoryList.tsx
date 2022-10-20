import {FC} from 'react'
import {TransactionType} from "../types/sliceTypes/category.type";
import {useGetCategoriesQuery} from "../api/categoryApi";
import Loader from "../ui/Loader";
import {useAppSelector} from "../hooks/storeHooks";
import {Group} from "@mantine/core";
import CategoryIcon from "./CategoryIcon";

interface PropsType {
  transactionType: TransactionType
  iconProps?: any
}

const CategoryList: FC<PropsType> = ({transactionType, iconProps}) => {
  const {isLoading} = useGetCategoriesQuery(transactionType)
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])

  if(isLoading) return <Loader height={"100%"}/>

  return (
    <Group mt={"md"}>
      {
        categories.map(category => (
          <CategoryIcon
            key={category.id}
            backgroundColor={category.iconBackgroundColor}
            iconName={category.iconName}
            style={{cursor: "pointer"}}
            backgroundSize={"100%"}
            {...iconProps}
          />
        ))
      }
    </Group>
  )
}

export default CategoryList
