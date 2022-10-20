import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import {useAppSelector} from "../hooks/storeHooks";
import CategoryList from "../components/CategoryList";
import CategorySegmentControl from "../components/CategorySegmentControl";
import {Group, Switch, Text} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import CategoryReorder from "../components/CategoryReorder";
import {useUpdateOrderMutation} from "../api/categoryApi";
import Loader from "../ui/Loader";

const Categories = () => {
  const activeTransactionType = useAppSelector(state => state.categorySlice.activeTransactionType)
  const [isReorderingMode, setIsReorderingMode] = useState<any>(false)
  const categories = useAppSelector(state => state.categorySlice[`${activeTransactionType}Categories`])
  const [categoriesNewOrder, setCategoiesNewOrder] = useState<any>(categories.map(category  => category.id))
  const [updateOrder, {isLoading}] = useUpdateOrderMutation()
  const CategoryIconProps = {
    iconSize: "3rem",
    backgroundSize: "5rem"
  }

  useEffect(() => {
    if(!isReorderingMode) {
      if(categories.map(category => category.id).join("") !== categoriesNewOrder.join("")) {
        updateOrder(categoriesNewOrder)
      }
    }
  }, [isReorderingMode])

  useEffect(() => {
    setCategoiesNewOrder(categories.map(category => category.id))
  }, [categories])

  const onSwitchClickHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsReorderingMode(e.currentTarget.checked)
  }

  if(isLoading) {
    return (
      <DefaultPageWrapper>
        <Loader height={"80vh"}/>
      </DefaultPageWrapper>
    )
  }

  return (
    <DefaultPageWrapper>
      <Group position={"apart"}>
        <CategorySegmentControl disabled={isReorderingMode}/>
        <Group>
          <Text>Reordering mode: </Text>
          <Switch
            value={isReorderingMode}
            onChange={onSwitchClickHandle}
            onLabel={"ON"}
            offLabel={"OFF"}
            size={"md"}
          />
        </Group>
      </Group>
      {
        isReorderingMode ?
          <CategoryReorder
            transactionType={activeTransactionType}
            categoriesNewOrder={categoriesNewOrder}
            setCategoiesNewOrder={setCategoiesNewOrder}
          />
          :
          <CategoryList iconProps={CategoryIconProps} transactionType={activeTransactionType}/>
      }
    </DefaultPageWrapper>
  )
}

export default Categories
