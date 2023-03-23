import {FC, useEffect} from 'react'
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {useLazyGetCategoriesQuery} from "../api/categoryApi";
import Loader from "./Loader";
import {useAppSelector} from "../hooks/storeHooks";
import {Group} from "@mantine/core";
import CategoryIcon from "./CategoryIcon";

interface PropsType {
  transactionType: TransactionType
  iconProps?: any
}

const CategoryList: FC<PropsType> = ({transactionType, iconProps}) => {
  const [getCategories, {isLoading}] = useLazyGetCategoriesQuery()
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const hasOnClickEvent = !!iconProps.onClick

  useEffect(() => {
    getCategories(transactionType)
  }, []);


  if (isLoading || !categories.length) return <Loader height={"80vh"}/>

  return (
    <Group mt={"md"}>
      {
        categories.map(category => (
          <CategoryIcon
            description={category.name}
            key={category.id}
            backgroundColor={category.iconBackgroundColor}
            iconName={category.iconName}
            style={{cursor: "pointer"}}
            {...iconProps}
            onClick={hasOnClickEvent ? iconProps.onClick.bind(this, category.id) : null}
          />
        ))
      }
    </Group>
  )
}

export default CategoryList
