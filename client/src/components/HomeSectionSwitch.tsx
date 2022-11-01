import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {setActiveTransactionType} from "../store/transactionSlice";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import TransactionTypeSegmentControl from "./TransactionTypeSegmentControl";


const HomeSectionSwitch = () => {
  const dispatch = useAppDispatch()
  const activeTransactionType = useAppSelector(state => state.transactionSlice.activeTransactionType)

  const setNewTransactionType = (transactionType: TransactionType) => {
    dispatch(setActiveTransactionType(transactionType))
  }

  return (
    <TransactionTypeSegmentControl
      transactionType={activeTransactionType}
      onChange={setNewTransactionType}
      position={"center"}
    />
  )
}

export default HomeSectionSwitch
