import {useAppSelector} from "../hooks/storeHooks";
import AccountService from "../services/accountService";

const CenteredMetric = ({dataWithArc, centerX, centerY}: any) => {
  const isEmpty = dataWithArc[0].data.isEmpty
  const currency = useAppSelector(state => state.accountSlice.activeAccount.currency)

  const getAllValues = () => {
    let value = 0
    dataWithArc.forEach((obj: any) => value += obj.data.value)

    return AccountService.getFormattedAmount(value, currency, true)
  }

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={isEmpty ? {
        color: "#FFFFFF",
        fontSize: '1.2rem',
      } : {
        color: "#FFFFFF",
        fontSize: '1.9rem',
        fontWeight: 600
      }}
    >
      {isEmpty ? "There aren't any data" : getAllValues()}
    </text>
  )
}

export default CenteredMetric
