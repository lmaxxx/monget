import {cloneElement, FC} from 'react'
import {Box, Group} from '@mantine/core'
import accountIcons, {AccountIconType} from "../data/accountIcons";

interface PropsType {
  iconName: AccountIconType
  backgroundColor?: string
  size?: string
  isActive?: boolean
  color?: string
  [other: string]: any
}

const AccountIcon: FC<PropsType> = ({
                                      iconName ,
                                      backgroundColor,
                                      size = "2rem",
                                      isActive,
                                      color= "#fff",
                                      ...other
}) => {
  if(!iconName || !backgroundColor) {
    return (
      <Box
        p={".2rem"}
        sx={{
          backgroundColor: "#ccc",
          borderRadius: ".5rem",
          height: size,
          width: size,
        }}
      />
    )
  }

  const Icon = () => cloneElement(accountIcons[iconName], {color})

  return (
    <Group
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
      <Icon/>
    </Group>
  )
}

export default AccountIcon
