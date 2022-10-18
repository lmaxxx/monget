import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import AllCategories from "../components/AllCategories";
import {useGetExpensesCategoriesQuery} from "../api/categoryApi";

const Categories = () => {
  const {data, isLoading} = useGetExpensesCategoriesQuery()

  if(!isLoading) console.log(data)

  const iconProps = {
    onClick(iconName: string) {
      console.log("Hello " + iconName)
    }
  }

  return (
    <DefaultPageWrapper>
      <AllCategories iconsProps={iconProps}/>
    </DefaultPageWrapper>
  )
}

export default Categories
