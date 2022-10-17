import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import AllCategories from "../components/AllCategories";

const Categories = () => {
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
