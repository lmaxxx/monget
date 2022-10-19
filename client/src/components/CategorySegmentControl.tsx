import {Group, SegmentedControl} from "@mantine/core";
import {TransactionType} from "../types/sliceTypes/category.type";
import {useAppSelector} from "../hooks/storeHooks";
import {useDispatch} from "react-redux";
import {setActiveTransactionType} from "../store/categorySlice";
import {FC} from "react";

interface PropsType {
  disabled: boolean
}

const CategorySegmentControl: FC<PropsType> = ({disabled}) => {
  const activeTransactionType = useAppSelector(state => state.categorySlice.activeTransactionType)
  const dispatch = useDispatch()

  const activeTransactionHadle = (transactionType: TransactionType) => {
    dispatch(setActiveTransactionType(transactionType))
  }

  return (
    <Group position={"center"}>
      <SegmentedControl
        disabled={disabled}
        value={activeTransactionType}
        onChange={activeTransactionHadle}
        data={[
          { label: 'Expenses', value:  TransactionType.Expenses},
          { label: 'Income', value: TransactionType.Income },
        ]}
      />
    </Group>
  )
}

export default CategorySegmentControl
