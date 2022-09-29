import {Group, SegmentedControl} from "@mantine/core";
import {HomeSwitchValue} from "../types/ui.type";
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks";
import {setActiveSection} from "../store/financeHistorySlice";

const segmentData = [
  {label: "Expenses", value: HomeSwitchValue.Expenses},
  {label: "Income", value: HomeSwitchValue.Income},
]

const HomeSectionSwitch = () => {
  const dispatch = useAppDispatch()
  const activeSection = useAppSelector(state => state.financeHistory.activeSection)

  const setNewActiveSection = (section: HomeSwitchValue) => {
    dispatch(setActiveSection(section))
  }

  return (
    <Group position={"center"} mb={"1.5rem"}>
      <SegmentedControl
        data={segmentData}
        value={activeSection}
        onChange={setNewActiveSection}
      />
    </Group>
  )
}

export default HomeSectionSwitch
