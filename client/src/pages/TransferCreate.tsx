import {Center, Paper, Title, useMantineTheme} from "@mantine/core";
import TransferCreateForm from "../components/TransferCreateForm";
import FormHeader from "../components/FormHeader";

const TransferCreate = () => {
  const theme = useMantineTheme()

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <FormHeader title={"New transfer"} goBackPath={"/accounts"}/>
        <TransferCreateForm/>
      </Paper>
    </Center>
  )
}

export default TransferCreate
