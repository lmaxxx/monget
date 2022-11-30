import {Group, Select, Text} from "@mantine/core";
import StatisticTransactionSegmentControl from "./StatisticTransactionSegmentControl";
import {useAppSelector} from "../hooks/storeHooks";
import {useDispatch} from "react-redux";
import {setActiveStatisticTransactionType, setStatisticDateType} from "../store/statisticSlice";
import {StatisticDateType, StatisticTransactionType} from "../types/sliceTypes/statistic.type";
import StatisticDateLabel from "./StatisticDateLabel";


const ChartsNavbar = () => {
  const dispatch = useDispatch()
  const activeStatisticTransactionType = useAppSelector(state => state.statisticSlice.activeStatisticTransactionType)
  const statisticDateType = useAppSelector(state => state.statisticSlice.statisticDateType)

  const setStatisticTransactionTypeDispatch = (type: StatisticTransactionType) => {
    dispatch(setActiveStatisticTransactionType(type))
  }

  const setStatisticDateTypeDispatch = (type: StatisticDateType) => {
    dispatch(setStatisticDateType(type))
  }

  return (
    <Group position={"center"}>
      <StatisticTransactionSegmentControl
        onChange={setStatisticTransactionTypeDispatch}
        statisticTransactionType={activeStatisticTransactionType}
      />
      <StatisticDateLabel/>
      <Select
        placeholder="Statistic period"
        value={statisticDateType}
        onChange={setStatisticDateTypeDispatch}
        variant={"filled"}
        data={[
          {value: StatisticDateType.PerYear, label: "Per year"},
          {value: StatisticDateType.PerMonth, label: "Per month"},
          {value: StatisticDateType.PerWeek, label: "Per week"},
        ]}
      />
    </Group>
  )
}

export default ChartsNavbar
