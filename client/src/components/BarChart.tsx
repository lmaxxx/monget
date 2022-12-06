import {ResponsiveBar} from "@nivo/bar";
import StatisticService from "../services/statisticService";
import {BarChartKey, StatisticTransactionType} from "../types/sliceTypes/statistic.type";
import {Box, LoadingOverlay} from "@mantine/core";
import {useAppSelector} from "../hooks/storeHooks";
import {FC} from "react";

interface PropsType {
  isFetching: boolean
}

const BarChart: FC<PropsType> = ({isFetching}) => {
  const data = useAppSelector(state => state.statisticSlice.data)
  const activeStatisticTransactionType = useAppSelector(state => state.statisticSlice.activeStatisticTransactionType)

  return (
    <Box sx={{height: "50vh", width: "100%", position: "relative"}}>
      <LoadingOverlay visible={isFetching} overlayBlur={2}/>
      <ResponsiveBar
        renderWrapper={true}
        data={data as any}
        groupMode={"grouped"}
        colors={({id}: {id: string | number}) => StatisticService.getBarChartColor(id as BarChartKey)}
        keys={StatisticService.getBarChartKeys(activeStatisticTransactionType)}
        indexBy="label"
        margin={{top: 20, bottom: 50, left: 50}}
        padding={0.3}
        valueScale={{type: 'linear'}}
        indexScale={{type: 'band', round: true}}
        legends={[
          {
            anchor: 'bottom',
            dataFrom: 'keys',
            direction: 'row',
            itemHeight: 20,
            itemWidth: 80,
            toggleSerie: activeStatisticTransactionType === StatisticTransactionType.General,
            translateY: 50,
          },
        ]}
        enableLabel={false}
      />
    </Box>
  )
}

export default BarChart
