import {FC} from 'react'
import {Button, Group, Modal, Stack, Title, useMantineTheme} from "@mantine/core";
import {TransactionRequestDateType} from "../types/sliceTypes/transaction.type";
import {RangeCalendar} from "@mantine/dates";

interface PropsType {
  opened: boolean
  onClose?: () => void
  setTransactionRequestDate?: (newValue: TransactionRequestDateType) => void
  activeTransactionRequestDate?: TransactionRequestDateType
}

const ChooseDateModel: FC<PropsType> = ({
                                          opened,
                                          onClose,
                                          setTransactionRequestDate,
                                          activeTransactionRequestDate
}) => {
  const theme = useMantineTheme()

  const getVariant = (transactionRequestDate: TransactionRequestDateType) => (
    activeTransactionRequestDate === transactionRequestDate ? "filled" : "light"
  )

  return (
    <Modal
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={true}
      withCloseButton={false}
      onClose={() => {}}
      centered
    >
      <Stack align={"center"}>
        <Group position={"center"}>
          <Button variant={getVariant(TransactionRequestDateType.Today)}>Today</Button>
          <Button variant={getVariant(TransactionRequestDateType.Week)}>Last week</Button>
          <Button variant={getVariant(TransactionRequestDateType.Month)}>Last month</Button>
        </Group>
        <Title align={"center"} mt={"md"} mb={"sm"}>Range</Title>
        <RangeCalendar value={[new Date, new Date]} onChange={() => {}} />
        <Group mt={"sm"} position={"center"}>
          <Button>Set range</Button>
        </Group>
      </Stack>

    </Modal>
  )
}

export default ChooseDateModel
