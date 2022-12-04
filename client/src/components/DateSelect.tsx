import {FC, useState} from 'react'
import {DateRangeType, TransactionDateRequestType} from "../types/sliceTypes/transaction.type";
import ChooseDateModal from "./ChooseDateModal";
import {Button, Group} from '@mantine/core'
import TransactionService from "../services/transactionService";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons";

interface PropsType {
  setActiveTransactionDateRequestType: (newValue: TransactionDateRequestType) => void
  activeTransactionDateRequestType: TransactionDateRequestType
  range: DateRangeType
  setRange: (newValue: DateRangeType) => void
  dateCounter: number
  addDateCounter: () => void
  subDateCounter: () => void
}

const DateSelect: FC<PropsType> = ({...props}) => {
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const label = TransactionService.getDateLabelText(
    props.activeTransactionDateRequestType,
    props.dateCounter,
    props.range,
  )

  const openModal = () => setOpenedModal(true)
  const closeModal = () => setOpenedModal(false)

  return (
    <>
      <Group spacing={"xs"} position={"center"}>
        {
          props.activeTransactionDateRequestType !== TransactionDateRequestType.Range
          &&
          <Button
            variant="subtle"
            color={"gray"}
            onClick={props.addDateCounter}
            p={0}
          >
            <IconChevronLeft/>
          </Button>
        }
        <Button variant={"subtle"} onClick={openModal}>{label}</Button>
        {
          props.activeTransactionDateRequestType !== TransactionDateRequestType.Range
          &&
          <Button
            variant="subtle"
            color={"gray"}
            onClick={props.subDateCounter}
            p={0}
          >
            <IconChevronRight/>
          </Button>
        }
      </Group>
      <ChooseDateModal
        opened={openedModal}
        onClose={closeModal}
        {...props}
      />
    </>
  )
}

export default DateSelect
