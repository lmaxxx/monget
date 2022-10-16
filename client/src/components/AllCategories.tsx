import {FC} from 'react'
import {Box, Text} from "@mantine/core";
import transactionIcons, {TransactionIconType} from "../data/transactionIcons";
import CategoryIcon from "./CategoryIcon";

interface PropsType {

}

const AllCategories: FC<PropsType> = () => {


  return (
    <Box>
      {
        transactionIcons.map(([section, icons]) => {
          const iconNames = Object.keys(icons)

          return (
            <div>
              <Text>{section}</Text>
              {
                iconNames.map((iconName) => <CategoryIcon mt={"2rem"} iconName={iconName as TransactionIconType}/>)
              }
            </div>
          )
        })
      }
    </Box>
  )
}

export default AllCategories
