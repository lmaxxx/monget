import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import {useAppSelector} from "../hooks/storeHooks";
import CategoryList from "../components/CategoryList";
import CategorySegmentControl from "../components/CategorySegmentControl";
import {Group, Switch, Text} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import CategoryReorder from "../components/CategoryReorder";
import {useUpdateOrderMutation} from "../api/categoryApi";
import Loader from "../ui/Loader";
import {useNavigate} from "react-router-dom";

const Categories = () => {
  const activeTransactionType = useAppSelector(state => state.categorySlice.activeTransactionType)
  const [isReorderingMode, setIsReorderingMode] = useState<any>(false)
  const categories = useAppSelector(state => state.categorySlice[`${activeTransactionType}Categories`])
  const [categoriesNewOrder, setCategoriesNewOrder] = useState<any>(categories.map(category  => category.id))
  const [updateOrder, {isLoading}] = useUpdateOrderMutation()
  const navigate = useNavigate()
  const categoryIconProps = {
    iconSize: "3rem",
    backgroundSize: "5rem",
    onClick: (id: string) => navigate(`/category/${id}`)
  }

  useEffect(() => {
    if(!isReorderingMode) {
      if(categories.map(category => category.id).join("") !== categoriesNewOrder.join("")) {
        updateOrder(categoriesNewOrder)
      }
    }
  }, [isReorderingMode])

  useEffect(() => {
    setCategoriesNewOrder(categories.map(category => category.id))
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
            setCategoriesNewOrder={setCategoriesNewOrder}
          />
          :
          <CategoryList iconProps={categoryIconProps} transactionType={activeTransactionType}/>
      }
    </DefaultPageWrapper>
  )
}

export default Categories
