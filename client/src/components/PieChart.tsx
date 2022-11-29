import {FC} from 'react'
import {ComputedDatum, ResponsivePie} from "@nivo/pie";
import CenteredMetric from "./CenteredMetric";
import {PieSection, TransactionType} from "../types/sliceTypes/transaction.type";
import emptyPieChartData from "../data/emptyPieChartData";
import PieTooltip from "./PieTooltip";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import CategoryService from "../services/categoryService";

interface PropsType {
  data: PieSection[]
  transactionType: TransactionType
}

const PieChart: FC<PropsType> = ({data, transactionType}) => {
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)
  const navigate = useNavigate()

  const onClick = (node: ComputedDatum<PieSection>) => {
    if(node.data.isEmpty) return

    const category = CategoryService.getCategoryById(categories, node.data.id)!
    navigate(`/transactions/${activeAccount.id}`, {state: {amount: node.data.value, category, transactionType, activeAccount}})
  }

  return (
    <ResponsivePie
      data={data.length ? data : emptyPieChartData}
      tooltip={({datum}) =>
        datum.data.isEmpty ?
          <></> :
          <PieTooltip transactionType={transactionType} data={datum.data}/>
    }
      onClick={onClick}
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
