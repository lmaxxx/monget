import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {Center, Paper, Text, useMantineTheme} from "@mantine/core";
import FormHeader from "../components/FormHeader";
import AccountService from "../services/accountService";
import {useEffect} from "react";
import TransactionList from "../components/TransactionList";
import AnimatedWrapper from "../hoc/AnimatedWrapper";
import AnimationService from "../services/animationService";

const CategoryTransactions = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {amount, category} = location.state
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)
  const theme = useMantineTheme()
  const animationsVariants = AnimationService.fadeInDown({})

  useEffect(() => {
    if (!Object.values(activeAccount).length) navigate("/")
  }, []);

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <AnimatedWrapper whileInView={"whileInView"} initial={"initial"} variants={animationsVariants}>
        <Paper sx={{maxWidth: 500, width: "90%", maxHeight: "90vh"}} shadow="xl" radius="md" p="xl">
          <FormHeader title={`${activeAccount.accountName} - ${category.name}`} goBackPath={"/"}/>
          <Text color={"cyan"} align={"center"} my={"sm"} fz={25} fw={500}>
            {AccountService.getFormattedAmount(amount, activeAccount.currency, true)}
          </Text>
          <TransactionList/>
        </Paper>
      </AnimatedWrapper>
    </Center>
  )
}

export default CategoryTransactions
