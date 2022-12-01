import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import ChartsNavbar from "../components/ChartsNavbar";
import {useLazyGetStatisticQuery} from "../api/statisticApi";
import {useEffect} from "react";
import {useAppSelector} from "../hooks/storeHooks";
import BarChart from "../components/BarChart";

const Charts = () => {
  const activeStatisticTransactionType = useAppSelector(state => state.statisticSlice.activeStatisticTransactionType)
  const statisticDateType = useAppSelector(state => state.statisticSlice.statisticDateType)
  const dateCounter = useAppSelector(state => state.statisticSlice.dateCounter)
  const [getStatistic] = useLazyGetStatisticQuery()

  useEffect(() => {
    getStatistic({
      [statisticDateType]: dateCounter,
      statisticTransactionType: activeStatisticTransactionType
    })
  }, [dateCounter, activeStatisticTransactionType, statisticDateType]);

  return (
    <DefaultPageWrapper>
      <ChartsNavbar/>
      <BarChart/>
    </DefaultPageWrapper>
  )
}

export default Charts
