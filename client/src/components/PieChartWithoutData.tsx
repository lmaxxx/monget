import {ResponsivePie} from "@nivo/pie";
import emptyPieChartData from "../data/emptyPieChartData";
import CenteredMetric from "../ui/CenteredMetric";

const PieChartWithoutData = () => {
  return (
    <ResponsivePie
      data={emptyPieChartData}
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

export default PieChartWithoutData
