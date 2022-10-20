import {Group} from "@mantine/core";
import CategoryIcon from "./CategoryIcon";
import {useAppSelector} from "../hooks/storeHooks";
import {TransactionType} from "../types/sliceTypes/category.type";
import CategoryService from "../services/categoryService";
import {FC} from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";

interface PropsType {
  transactionType: TransactionType
  categoriesNewOrder: any
  setCategoiesNewOrder: (newValue: any) => void
}

const CategoryReorder: FC<PropsType> = ({transactionType, categoriesNewOrder, setCategoiesNewOrder}) => {
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])

  const changeOrder = (sourceId: string, sourceIndex: number, targetIndex: number) => {
    const nextState = swap(categoriesNewOrder, sourceIndex, targetIndex);
    setCategoiesNewOrder(nextState);
  }

  return (
    <Group mt={"md"}>
      {
        <GridContextProvider onChange={changeOrder}>
          <GridDropZone
            id="categories reorder"
            boxesPerRow={4}
            rowHeight={100}
            style={{ height: "400px", width: "100%" }}
          >
            {categoriesNewOrder.map((categoryId: string) => {
              const category = CategoryService.getCategoryById(categories, categoryId)
              return (
                <GridItem style={{width: "5rem", height: "5rem"}} key={category?.id}>
                  <CategoryIcon
                    backgroundColor={category?.iconBackgroundColor}
                    iconName={category?.iconName || "IconApple"}
                    style={{cursor: "grab"}}
                    backgroundSize={"100%"}
                    iconSize={"3rem"}
                  />
                </GridItem>
              )
            })}
          </GridDropZone>
        </GridContextProvider>
      }
    </Group>
  )
}

export default CategoryReorder
