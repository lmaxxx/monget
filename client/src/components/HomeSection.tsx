import {Stack, Title, Button} from '@mantine/core'
import {FC} from 'react'
import PieChartWithoutData from "./PieChartWithoutData";
import {IconPlus} from "@tabler/icons";
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";

interface PropsType {
  title: string
}

const HomeSection: FC<PropsType> = ({title}) => {
  const activeAccountId = useAppSelector(state => state.accountSlice.activeAccount.id)

  return (
    <Stack align={"center"}>
      <Title align={"center"}>{title}</Title>
      <Stack sx={{height: "45vh", width: "100%"}}>
        <PieChartWithoutData/>
      </Stack>
      <Button
        component={Link}
        to={`/transaction/create/${activeAccountId}`}
        state={{transactionType: title.toLowerCase()}}
        size={"sm"}
        color={"green"}
        leftIcon={<IconPlus/>}
      >Create new transaction</Button>
    </Stack>
  )
}

export default HomeSection
