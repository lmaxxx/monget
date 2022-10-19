import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import AllCategoryIcons from "../components/AllCategoryIcons";
import {useGetCategoriesQuery} from "../api/categoryApi";
import {TransactionType} from "../types/sliceTypes/category.type";

const Categories = () => {
  const {data, isLoading} = useGetCategoriesQuery(TransactionType.Expenses)

  if(!isLoading) console.log(data)

  const iconProps = {
    onClick(iconName: string) {
      console.log("Hello " + iconName)
    }
  }

  return (
    <DefaultPageWrapper>
      <AllCategoryIcons iconsProps={iconProps}/>
    </DefaultPageWrapper>
  )
}

export default Categories
