import {Center, Paper, Title, useMantineTheme} from "@mantine/core";
import TransferCreateForm from "../components/TransferCreateForm";

const TransferCreate = () => {
  const theme = useMantineTheme()

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <Title mb={"sm"} order={2} sx={{fontSize: "2rem", fontWeight: 500}} align={"center"}>New transfer</Title>
        <TransferCreateForm/>
      </Paper>
    </Center>
  )
}

export default TransferCreate
