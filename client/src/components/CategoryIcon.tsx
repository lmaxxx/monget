import {cloneElement, FC} from 'react'
import {Box} from "@mantine/core"
import {transactionIconsObject, TransferIconType} from "../data/transactionIcons";

interface PropsType {
  backgroundColor: string
  iconName: TransferIconType
  size?: string
  color?: string
}

const CategoryIcon: FC<PropsType> = ({
  backgroundColor,
  iconName,
  size = "2rem",
  color= "#fff"
}) => {
  const Icon = () => cloneElement(transactionIconsObject[iconName], {color})

  return (
    <Box sx={{
      width: size,
      height: size,
      backgroundColor,
      display: "grid",
      placeItems: "center"
    }}>
      <Icon/>
    </Box>
  )
}

export default CategoryIcon
