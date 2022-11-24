import {FC} from 'react'
import {Button, Group, Modal, Stack, Title, useMantineTheme} from "@mantine/core";
import {DateRangeType, TransactionDateRequestType} from "../types/sliceTypes/transaction.type";
import {RangeCalendar} from "@mantine/dates";

interface PropsType {
  opened: boolean
  onClose: () => void
  setActiveTransactionDateRequestType: (newValue: TransactionDateRequestType) => void
  activeTransactionDateRequestType: TransactionDateRequestType
  range: DateRangeType,
  setRange: (newValue: DateRangeType) => void
}

const ChooseDateModal: FC<PropsType> = ({
                                          opened,
                                          onClose,
                                          setActiveTransactionDateRequestType,
                                          activeTransactionDateRequestType,
                                          range,
                                          setRange
                                        }) => {
  const theme = useMantineTheme()

  const getVariant = (transactionRequestDate: TransactionDateRequestType) => (
    activeTransactionDateRequestType === transactionRequestDate ? "filled" : "light"
  )

  const updateActiveTransactionDateRequest = (transactionRequestDate: TransactionDateRequestType) => (
    () => {
      setActiveTransactionDateRequestType(transactionRequestDate)
      onClose()
    }
  )

  return (
    <Modal
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      withCloseButton={false}
      onClose={() => {}}
      centered
    >
      <Stack align={"center"}>
        <Group position={"center"}>
          <Button
            variant={getVariant(TransactionDateRequestType.Today)}
            onClick={updateActiveTransactionDateRequest(TransactionDateRequestType.Today)}
          >Today</Button>
          <Button
            variant={getVariant(TransactionDateRequestType.Week)}
            onClick={updateActiveTransactionDateRequest(TransactionDateRequestType.Week)}
          >Last week</Button>
          <Button
            variant={getVariant(TransactionDateRequestType.Month)}
            onClick={updateActiveTransactionDateRequest(TransactionDateRequestType.Month)}
          >Last month</Button>
        </Group>
        <Title align={"center"} mt={"md"} mb={"sm"}>Range</Title>
        <RangeCalendar
          value={range}
          onChange={setRange}
        />
        <Group mt={"sm"} position={"center"}>
          <Button
            onClick={updateActiveTransactionDateRequest(TransactionDateRequestType.Range)}
          >Set range</Button>
        </Group>
      </Stack>

    </Modal>
  )
}

export default ChooseDateModal
