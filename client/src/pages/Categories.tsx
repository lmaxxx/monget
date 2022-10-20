import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import {useAppSelector} from "../hooks/storeHooks";
import CategoryList from "../components/CategoryList";
import CategorySegmentControl from "../components/CategorySegmentControl";
import {Group, Switch, Text} from "@mantine/core";
import {ChangeEvent, useState} from "react";
import CategoryReorder from "../components/CategoryReorder";

const Categories = () => {
  const activeTransactionType = useAppSelector(state => state.categorySlice.activeTransactionType)
  const [isReorderingMode, setIsReorderingMode] = useState<any>(false)
  const CategoryIconProps = {
    iconSize: "3rem",
    backgroundSize: "5rem"
  }

  const onSwitchClickHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsReorderingMode(e.currentTarget.checked)
  }

  return (
    <DefaultPageWrapper>
      <Group position={"apart"}>
        <CategorySegmentControl disabled={isReorderingMode}/>
        <Group>
          <Text>Reordering mode: </Text>
          <Switch
            value={isReorderingMode}
            onChange={onSwitchClickHandle}
            onLabel={"ON"}
            offLabel={"OFF"}
            size={"md"}
          />
        </Group>
      </Group>
      {
        isReorderingMode ?
          <CategoryReorder transactionType={activeTransactionType}/>
          :
          <CategoryList iconProps={CategoryIconProps} transactionType={activeTransactionType}/>
      }
    </DefaultPageWrapper>
  )
}

export default Categories
