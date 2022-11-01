import {Group, SegmentedControl} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {setActiveTransactionType} from "../store/transactionSlice";
import {TransactionType} from "../types/sliceTypes/transaction.type";

const segmentData = [
  {label: "Expenses", value: TransactionType.Expenses},
  {label: "Income", value: TransactionType.Income},
]

const HomeSectionSwitch = () => {
  const dispatch = useAppDispatch()
  const activeTransactionType = useAppSelector(state => state.transactionSlice.activeTransactionType)

  const setNewActiveSection = (transactionType: TransactionType) => {
    dispatch(setActiveTransactionType(transactionType))
  }

  return (
    <Group position={"center"} mb={"1.5rem"}>
      <SegmentedControl
        data={segmentData}
        value={activeTransactionType}
        onChange={setNewActiveSection}
      />
    </Group>
  )
}

export default HomeSectionSwitch
