import {Stack, Title} from '@mantine/core'
import {FC} from 'react'
import PieChartWithoutData from "./PieChartWithoutData";

interface PropsType {
  title: string
}

const HomeSection: FC<PropsType> = ({title}) => {
  return (
    <Stack style={{height: "50vh"}}>
      <Title align={"center"}>{title}</Title>
      <PieChartWithoutData/>
    </Stack>
  )
}

export default HomeSection
