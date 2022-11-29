import {FC} from 'react'
import {Group, GroupPosition, SegmentedControl} from "@mantine/core";
import {StatisticTransactionType} from "../types/sliceTypes/transaction.type";

interface PropsType {
  disabled?: boolean
  statisticTransactionType: StatisticTransactionType
  onChange: (newValue: StatisticTransactionType) => void
  position?: GroupPosition
}

const StatisticTransactionSegmentControl: FC<PropsType> = ({
                                                             disabled,
                                                             position,
                                                             onChange,
                                                             statisticTransactionType
                                                           }) => {
  return (
    <Group position={position}>
      <SegmentedControl
        disabled={disabled}
        value={statisticTransactionType}
        onChange={onChange}
        data={[
          {label: 'General', value: StatisticTransactionType.General},
          {label: 'Expenses', value: StatisticTransactionType.Expenses},
          {label: 'Income', value: StatisticTransactionType.Income},
        ]}
      />
    </Group>
  )
}

export default StatisticTransactionSegmentControl
