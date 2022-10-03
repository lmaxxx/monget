import {FC} from 'react'
import {Group} from '@mantine/core'
import {AccountIconName} from "../types/ui.type";
import accountIcons from "../data/accountIcons";

interface PropsType {
  iconName: AccountIconName
  backgroundColor: string
  size: string
  isActive?: boolean
  [other: string]: any
}

const AccountIcon: FC<PropsType> = ({iconName, backgroundColor, size, isActive, ...other}) => {
  return <Group
    position={"center"}
    p={".2rem"}
    sx={{
      backgroundColor,
      borderRadius: ".5rem",
      height: size,
      width: size,
      border: isActive ? "3px solid #238BE6": ""
    }}
    {...other}
  >
    {accountIcons[iconName]}
  </Group>
}

export default AccountIcon
