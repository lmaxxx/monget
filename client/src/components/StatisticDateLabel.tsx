import {Button, Group, Text} from "@mantine/core";
import {useAppSelector} from "../hooks/storeHooks";
import StatisticService from "../services/statisticService";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons";
import {addStatisticDateCounter, subStatisticDateCounter} from "../store/statisticSlice";
import {useDispatch} from "react-redux";

const StatisticDateLabel = () => {
  const dispatch = useDispatch()
  const dateCounter = useAppSelector(state => state.statisticSlice.dateCounter)
  const statisticDateType = useAppSelector(state => state.statisticSlice.statisticDateType)

  const addDateCounter = () => {
    dispatch(addStatisticDateCounter())
  }

  const subDateCounter = () => {
    dispatch(subStatisticDateCounter())
  }

  return (
    <Group spacing={"xs"}>
      <Button
        variant="subtle"
        color={"gray"}
        onClick={addDateCounter}
        p={0}
      >
        <IconChevronLeft/>
      </Button>
      <Text size={"sm"}>{StatisticService.getDateLabelText(statisticDateType, dateCounter)}</Text>
      <Button
        variant="subtle"
        color={"gray"}
        onClick={subDateCounter}
        p={0}
      >
        <IconChevronRight/>
      </Button>
    </Group>
  )
}

export default StatisticDateLabel
