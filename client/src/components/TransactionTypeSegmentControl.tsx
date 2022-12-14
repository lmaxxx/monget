import {Group, GroupPosition, SegmentedControl} from "@mantine/core";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {FC} from "react";

interface PropsType {
  disabled?: boolean
  transactionType: TransactionType
  onChange: (newValue: any) => void
  position?: GroupPosition
}

const TransactionTypeSegmentControl: FC<PropsType> = ({disabled, transactionType, onChange, position}) => {
  return (
    <Group position={position}>
      <SegmentedControl
        disabled={disabled}
        value={transactionType}
        onChange={onChange}
        data={[
          {label: 'Expenses', value: TransactionType.Expenses},
          {label: 'Income', value: TransactionType.Income},
        ]}
      />
    </Group>
  )
}

export default TransactionTypeSegmentControl
