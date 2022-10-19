import {FC} from 'react'
import {Title} from "@mantine/core";
import transactionIcons from "../data/transactionIcons";
import CategorySection from "./CategorySection";

interface PropsType {
  iconsProps?: any
}

const AllCategoryIcons: FC<PropsType> = ({iconsProps}) => {
  return (
    <>
      <Title align={"center"}>All icons</Title>
      {
        transactionIcons.map(([section, icons]) => (
          <CategorySection key={section} iconProps={iconsProps} section={section} icons={icons}/>
        ))
      }
    </>
  )
}

export default AllCategoryIcons
