import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {Center, Paper, Text, useMantineTheme} from "@mantine/core";
import FormHeader from "../components/FormHeader";
import AccountService from "../services/accountService";
import {useEffect} from "react";
import TransactionList from "../components/TransactionList";

const CategoryTransactions = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {amount, category, transactionType} = location.state
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)
  const theme = useMantineTheme()

  useEffect(() => {
    if (!Object.values(activeAccount).length) navigate("/")
  }, []);

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 500, width: "90%"}} shadow="xl" radius="md" p="xl">
        <FormHeader title={`${category.name}(${transactionType})`} goBackPath={"/"}/>
        <Text align={"center"} my={"sm"} fz={25} fw={500} color={"dark"}>
          {AccountService.getFormattedAmount(amount, activeAccount.currency, true)}
        </Text>
        <TransactionList/>
      </Paper>
    </Center>
  )
}

export default CategoryTransactions
