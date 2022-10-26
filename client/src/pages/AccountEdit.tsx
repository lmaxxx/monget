import {Center, Paper, useMantineTheme} from "@mantine/core";
import AccountEditForm from "../components/AccountEditForm";
import FormHeader from "../components/FormHeader";

const AccountEdit = () => {
  const theme = useMantineTheme()

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 700, width: "90%"}} shadow="xl" radius="md" p="xl">
        <FormHeader title={"Account settings"} goBackPath={"/accounts"}/>
        <AccountEditForm/>
      </Paper>
    </Center>
  )
}

export default AccountEdit
