import {Group} from "@mantine/core";
import CategoryIcon from "./CategoryIcon";
import {useAppSelector} from "../hooks/storeHooks";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import CategoryService from "../services/categoryService";
import {FC, useEffect, useState} from "react";
import {GridContextProvider, GridDropZone, GridItem, swap} from "react-grid-dnd";

interface PropsType {
  transactionType: TransactionType
  categoriesNewOrder: any
  setCategoriesNewOrder: (newValue: any) => void
}

const CategoryReorder: FC<PropsType> = ({transactionType, categoriesNewOrder, setCategoriesNewOrder}) => {
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const [categoriesPerRow, setCategoriesPerRow] = useState<number>(3)
  const [wrapperWidth, setWrapperWidth] = useState<number>(0)

  useEffect(() => {
    handleResize()
  }, [wrapperWidth])

  const getWidthFromRef = (data: any) => {
    if (!data) return
    setWrapperWidth(data.clientWidth)
  }

  const handleResize = () => {
    const newAmountOfCategories = CategoryService.calculateSuitableAmountOfCategories(wrapperWidth, 80)
    if (newAmountOfCategories !== categoriesPerRow) setCategoriesPerRow(newAmountOfCategories)
  }

  const changeOrder = (sourceId: string, sourceIndex: number, targetIndex: number) => {
    const nextState = swap(categoriesNewOrder, sourceIndex, targetIndex);
    setCategoriesNewOrder(nextState);
  }

  return (
    <Group ref={getWidthFromRef} mt={"md"}>
      <GridContextProvider onChange={changeOrder}>
        <GridDropZone
          id="categories reorder"
          boxesPerRow={categoriesPerRow}
          rowHeight={120}
          style={{minHeight: "70vh", height: "100%", width: "100%"}}
        >
          {categoriesNewOrder.map((categoryId: string) => {
            const category = CategoryService.getCategoryById(categories, categoryId)
            return (
              <GridItem style={{width: "5rem", height: "5"}} key={category?.id}>
                <CategoryIcon
                  description={category?.name}
                  backgroundColor={category?.iconBackgroundColor}
                  iconName={category?.iconName || "IconApple"}
                  style={{cursor: "grab"}}
                  backgroundSize={"5rem"}
                  iconSize={"3rem"}
                />
              </GridItem>
            )
          })}
        </GridDropZone>
      </GridContextProvider>
    </Group>
  )
}

export default CategoryReorder
