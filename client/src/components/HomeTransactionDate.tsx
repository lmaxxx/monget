import DateSelect from "./DateSelect";
import {Group} from "@mantine/core";
import {DateRangeType, TransactionDateRequestType} from "../types/sliceTypes/transaction.type";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {addDateCounter, setRange, setTransactionDateRequestType, subDateCounter} from "../store/transactionSlice";


const HomeTransactionDate = () => {
  const dispatch = useAppDispatch()
  const activeTransactionDateRequestType = useAppSelector(state => state.transactionSlice.transactionDateRequestType)
  const range = useAppSelector(state => state.transactionSlice.range)
  const dateCounter = useAppSelector(state => state.transactionSlice.dateCounter)

  const setRangeDispatch = (newRange: DateRangeType) => dispatch(setRange(newRange))
  const setActiveTransactionDateRequestTypeDispatch = (newType: TransactionDateRequestType) => dispatch(setTransactionDateRequestType(newType))
  const addDateCounterDispatch = () => dispatch(addDateCounter())
  const subDateCounterDispatch = () => dispatch(subDateCounter())

  return (
    <Group position={"center"}>
      <DateSelect
        activeTransactionDateRequestType={activeTransactionDateRequestType}
        setActiveTransactionDateRequestType={setActiveTransactionDateRequestTypeDispatch}
        range={range}
        setRange={setRangeDispatch}
        dateCounter={dateCounter}
        addDateCounter={addDateCounterDispatch}
        subDateCounter={subDateCounterDispatch}
      />
    </Group>
  )
}

export default HomeTransactionDate
