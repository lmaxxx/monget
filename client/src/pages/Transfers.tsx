import {Center, CloseButton, Group, Paper, Title, useMantineTheme} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import TransferList from "../components/TransferList";
import FormHeader from "../components/FormHeader";

const Transfers = () => {
  const theme = useMantineTheme()

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <FormHeader title={"Transfers"} goBackPath={"/accounts"} />
        <TransferList/>
      </Paper>
    </Center>
  )
}

export default Transfers
