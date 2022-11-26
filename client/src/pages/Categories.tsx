import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import CategoryList from "../components/CategoryList";
import TransactionTypeSegmentControl from "../components/TransactionTypeSegmentControl";
import {Button, Group, Switch, Text} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import CategoryReorder from "../components/CategoryReorder";
import {useUpdateOrderMutation} from "../api/categoryApi";
import Loader from "../components/Loader";
import {Link, useNavigate} from "react-router-dom";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {setActiveTransactionType} from "../store/categorySlice";
import {IconPlus} from "@tabler/icons";

const Categories = () => {
  const activeTransactionType = useAppSelector(state => state.categorySlice.activeTransactionType)
  const [isReorderingMode, setIsReorderingMode] = useState<any>(false)
  const categories = useAppSelector(state => state.categorySlice[`${activeTransactionType}Categories`])
  const [categoriesNewOrder, setCategoriesNewOrder] = useState<any>(categories.map(category => category.id))
  const [updateOrder, {isLoading}] = useUpdateOrderMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const categoryIconProps = {
    iconSize: "3rem",
    backgroundSize: "5rem",
    onClick: (id: string) => navigate(`/category/${id}`)
  }

  const activeTransactionHadle = (transactionType: TransactionType) => {
    dispatch(setActiveTransactionType(transactionType))
  }

  useEffect(() => {
    if (!isReorderingMode) {
      if (categories.map(category => category.id).join("") !== categoriesNewOrder.join("")) {
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

  if (isLoading) {
    return (
      <DefaultPageWrapper>
        <Loader height={"80vh"}/>
      </DefaultPageWrapper>
    )
  }

  return (
    <DefaultPageWrapper>
      <Group position={"apart"}>
        <TransactionTypeSegmentControl
          onChange={activeTransactionHadle}
          transactionType={activeTransactionType}
          disabled={isReorderingMode}
        />
        <Button
          component={Link}
          to={"/category"}
          color={"green"}
          leftIcon={<IconPlus/>}
        >New category</Button>
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
