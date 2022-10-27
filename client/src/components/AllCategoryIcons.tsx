import {FC} from 'react'
import transactionIcons from "../data/transactionIcons";
import CategorySection from "./CategorySection";

interface PropsType {
  iconsProps?: any
}

const AllCategoryIcons: FC<PropsType> = ({iconsProps}) => {
  return (
    <>
      {
        transactionIcons.map(([section, icons]) => (
          <CategorySection key={section} iconProps={iconsProps} section={section} icons={icons}/>
        ))
      }
    </>
  )
}

export default AllCategoryIcons
