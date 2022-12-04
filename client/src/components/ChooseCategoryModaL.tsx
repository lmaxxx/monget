import {Modal, useMantineTheme} from "@mantine/core";
import {FC} from "react";
import CategoryList from "./CategoryList";
import {TransactionType} from "../types/sliceTypes/transaction.type";

interface PropsType {
  opened: boolean
  onClose: () => void
  setActiveCategoryId: (newValue: any) => void
  transactionType: TransactionType
}

const ChooseCategoryModaL: FC<PropsType> = ({
                                              opened,
                                              onClose,
                                              setActiveCategoryId,
                                              transactionType
                                            }) => {
  const theme = useMantineTheme()
  const setIconAndClose = (id: string) => {
    setActiveCategoryId(id)
    onClose()
  }
  const iconProps = {
    iconSize: "3rem",
    backgroundSize: "5rem",
    onClick: setIconAndClose
  }

  return (
    <Modal
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={onClose}
      centered
    >
      <CategoryList iconProps={iconProps} transactionType={transactionType}/>
    </Modal>
  )
}

export default ChooseCategoryModaL
