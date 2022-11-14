import {FC} from 'react'
import {Modal, useMantineTheme} from '@mantine/core'
import AllCategoryIcons from "./AllCategoryIcons";

interface PropsType {
  opened: boolean
  onClose: () => void
  setActiveIconName: (newValue: any) => void
}

const ChooseCategoryIconModal: FC<PropsType> = ({
                                                  opened,
                                                  onClose,
                                                  setActiveIconName,
                                                }) => {
  const theme = useMantineTheme()
  const setIconAndClose = (name: string) => {
    setActiveIconName(name)
    onClose()
  }
  const iconProps = {onClick: setIconAndClose}

  return (
    <Modal
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={onClose}
      centered
    >
      <AllCategoryIcons iconsProps={iconProps}/>
    </Modal>
  )
}

export default ChooseCategoryIconModal
