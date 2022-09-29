import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {useEffect} from "react";
import {Center, Paper, Title, useMantineTheme} from "@mantine/core";
import AccountEditForm from "../components/AccountEditForm";

const AccountEdit = () => {
  const {id} = useParams()
  const accounts = useAppSelector(state => state.accountSlice.accounts)
  const currentAccount = accounts.find(account => account.id === id)
  const navigate = useNavigate()
  const theme = useMantineTheme()

  useEffect(() => {
    if(!currentAccount) navigate("/accounts")
  }, [currentAccount])

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <Title mb={"sm"} order={2} sx={{fontSize: "2rem", fontWeight: 500}} align={"center"}>Account settings</Title>
        <AccountEditForm/>
      </Paper>
    </Center>
  )
}

export default AccountEdit
