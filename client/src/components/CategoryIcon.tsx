import {cloneElement, FC} from 'react'
import {Box, Group, Text} from "@mantine/core"
import {transactionIconsObject, TransactionIconType} from "../data/transactionIcons";
import HiddenTextStyles from "../assets/hiddenTextStyles";

interface PropsType {
  backgroundColor?: string
  iconName: TransactionIconType
  backgroundSize?: string
  iconSize?: string
  color?: string
  description?: string

  [x: string]: any
}

const CategoryIcon: FC<PropsType> = ({
                                       backgroundColor = "#ccc",
                                       iconName,
                                       backgroundSize = "32px",
                                       iconSize,
                                       color = "#fff",
                                       description,
                                       ...others
                                     }) => {
  const Icon = () => cloneElement(transactionIconsObject[iconName], {color, size: iconSize})

  return (
    <Box sx={{width: backgroundSize}}>
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
      <Text align={"center"} color={backgroundColor} sx={{...HiddenTextStyles}}>{description}</Text>
    </Box>
  )
}

export default CategoryIcon
