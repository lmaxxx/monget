import {FC} from 'react'
import transactionIcons from "../data/transactionIcons";
import CategoryIconsSection from "./CategoryIconsSection";

interface PropsType {
  iconsProps?: any
}

const AllCategoryIcons: FC<PropsType> = ({iconsProps}) => {
  return (
    <>
      {
        transactionIcons.map(([section, icons]) => (
          <CategoryIconsSection key={section} iconProps={iconsProps} section={section} icons={icons}/>
        ))
      }
    </>
  )
}

export default AllCategoryIcons
