import {Center, Paper, Title, useMantineTheme} from "@mantine/core";
import AccountCreateForm from "../components/AccountCreateForm";
import FormHeader from "../components/FormHeader";

const AccountCreate = () => {
  const theme = useMantineTheme()

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <FormHeader title={"New account"} goBackPath={"/accounts"}/>
        <AccountCreateForm/>
      </Paper>
    </Center>
  )
}

export default AccountCreate
