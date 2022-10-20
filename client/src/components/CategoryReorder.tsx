import {Group} from "@mantine/core";
import CategoryIcon from "./CategoryIcon";
import {useAppSelector} from "../hooks/storeHooks";
import {ICategory, TransactionType} from "../types/sliceTypes/category.type";
import CategoryService from "../services/categoryService";
import {FC, useState} from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem, move,
  swap
} from "react-grid-dnd";

interface PropsType {
  transactionType: TransactionType
}

const CategoryReorder: FC<PropsType> = ({transactionType}) => {
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const [categoriesNewOrder, setCategoiesNewOrder] = useState<any>(categories.map(category  => category.id))

  function changeOrder(sourceId: string, sourceIndex: number, targetIndex: number) {
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
                    style={{cursor: "pointer"}}
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
