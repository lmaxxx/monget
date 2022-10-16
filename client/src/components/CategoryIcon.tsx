import {cloneElement, FC} from 'react'
import {Group} from "@mantine/core"
import {transactionIconsObject, TransactionIconType} from "../data/transactionIcons";

interface PropsType {
  backgroundColor?: string
  iconName: TransactionIconType
  backgroundSize?: string
  iconSize?: string
  color?: string
  [x: string]: any
}

const CategoryIcon: FC<PropsType> = ({
                                       backgroundColor = "#ccc",
                                       iconName,
                                       backgroundSize = "2rem",
                                       iconSize,
                                       color = "#fff",
                                       ...others
                                     }) => {
  const Icon = () => cloneElement(transactionIconsObject[iconName], {color, size: iconSize})

  return (
    <Group
      position={"center"}
      p={".2rem"}
      sx={{
        borderRadius: ".5rem",
        width: backgroundSize,
        height: backgroundSize,
        backgroundColor,
      }}
      {...others}
    >
      <Icon/>
    </Group>
  )
}

export default CategoryIcon
