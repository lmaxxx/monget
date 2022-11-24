const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
  const isEmpty = dataWithArc[0].data.isEmpty

  const getAllValues = () => {
    let value = 0
    dataWithArc.forEach((obj: any) => value += obj.data.value)

    return value
  }

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        color:"#FFFFFF",
        fontSize: '1.2rem',
      }}
    >
      {isEmpty ? "There aren't any data" : getAllValues()}
    </text>
  )
}

export default CenteredMetric
