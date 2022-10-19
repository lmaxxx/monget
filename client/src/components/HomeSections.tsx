import {SimpleGrid} from "@mantine/core";
import HomeSection from "./HomeSection";
import HomeSectionSwitch from "./HomeSectionSwitch";
import {useMediaQuery} from "@mantine/hooks";
import {useAppSelector} from "../hooks/storeHooks";
import {HomeSwitchValue} from "../types/ui.type";

const HomeSections = () => {
  const isTablet = useMediaQuery('(max-width: 900px)');
  const activeSection = useAppSelector(state => state.financeHistorySlice.activeSection)

  if(isTablet) {
    return (
      <>
        <HomeSectionSwitch/>
        <SimpleGrid cols={1}>
          {activeSection === HomeSwitchValue.Expenses && <HomeSection title={"Expenses"}/>}
          {activeSection === HomeSwitchValue.Income && <HomeSection title={"Income"}/>}
        </SimpleGrid>
      </>
    )
  }

  return (
    <>
      <SimpleGrid cols={2}>
        <HomeSection title={"Expenses"}/>
        <HomeSection title={"Income"}/>
      </SimpleGrid>
    </>
  )
}

export default HomeSections
