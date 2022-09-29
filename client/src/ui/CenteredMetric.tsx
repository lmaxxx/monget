const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
  const isEmpty = dataWithArc[0].data.isEmpty

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
      {isEmpty ? "There aren't any data" : "Data"}
    </text>
  )
}

export default CenteredMetric
