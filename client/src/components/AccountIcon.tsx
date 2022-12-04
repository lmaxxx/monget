import {cloneElement, FC} from 'react'
import {Box, Group} from '@mantine/core'
import accountIcons, {AccountIconType} from "../data/accountIcons";

interface PropsType {
  iconName: AccountIconType
  backgroundColor?: string
  backgroundSize?: string
  iconSize?: string
  isActive?: boolean
  color?: string

  [other: string]: any
}

const AccountIcon: FC<PropsType> = ({
                                      iconName,
                                      backgroundColor,
                                      backgroundSize = "2rem",
                                      iconSize,
                                      isActive,
                                      color = "#fff",
                                      ...other
                                    }) => {
  if (!iconName || !backgroundColor) {
    return (
      <Box
        p={".2rem"}
        sx={{
          backgroundColor: "#ccc",
          borderRadius: ".5rem",
          height: backgroundSize,
          width: backgroundSize,
        }}
      />
    )
  }

  const Icon = () => cloneElement(accountIcons[iconName], {color, size: iconSize})

  return (
    <Group
      position={"center"}
      p={".2rem"}
      sx={{
        backgroundColor,
        borderRadius: ".5rem",
        height: backgroundSize,
        width: backgroundSize,
        border: isActive ? "3px solid #238BE6" : ""
      }}
      {...other}
    >
      <Icon/>
    </Group>
  )
}

export default AccountIcon
