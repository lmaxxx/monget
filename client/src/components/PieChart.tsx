import {FC} from 'react'
import {ResponsivePie} from "@nivo/pie";
import CenteredMetric from "./CenteredMetric";
import {DonutSection} from "../types/sliceTypes/transaction.type";
import emptyPieChartData from "../data/emptyPieChartData";

interface PropsType {
  data: DonutSection[]
}

const PieChart: FC<PropsType> = ({data}) => {
  return (
    <ResponsivePie
      data={data.length ? data : emptyPieChartData}
      tooltip={() => <></>}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      colors={{ datum: 'data.color'}}
      margin={{ top: 10, bottom: 10, right: 10, left: 10}}
      innerRadius={0.8}
      padAngle={0.7}
      cornerRadius={3}
      activeInnerRadiusOffset={1}
      activeOuterRadiusOffset={1}
      layers={["arcs", CenteredMetric]}
    />
  )
}

export default PieChart
