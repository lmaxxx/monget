import {Center, CloseButton, Group, Paper, Title, useMantineTheme} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import TransferList from "../components/TransferList";

const Transfers = () => {
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const goBack = () => navigate("/accounts")

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <Group position={"apart"}>
          <Title mb={"sm"} order={2} sx={{fontSize: "2rem", fontWeight: 500}} align={"center"}>Transfers</Title>
          <CloseButton size={"lg"} onClick={goBack} aria-label="Close transfers" />
        </Group>
        <TransferList/>
      </Paper>
    </Center>
  )
}

export default Transfers
