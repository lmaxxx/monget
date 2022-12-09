import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import HomeBar from "../components/HomeBar";
import {useAppSelector} from "../hooks/storeHooks";
import {useLazyGetAccountsQuery} from "../api/accountApi";
import {Title} from '@mantine/core'
import AccountService from "../services/accountService";
import HomeSections from "../components/HomeSections";
import HomeTransactionDate from "../components/HomeTransactionDate";
import Loader from "../components/Loader";
import {useEffect} from "react";

const Home = () => {
  const [getAccounts] = useLazyGetAccountsQuery()
  const accountLength = useAppSelector(state => state.accountSlice.accounts.length)
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)
  const formattedAmount = AccountService.getFormattedAmount(activeAccount.amount, activeAccount.currency, true)

  useEffect(() => {
    getAccounts()
  }, []);

  if (!accountLength) {
    return (
      <DefaultPageWrapper>
        <Loader/>
      </DefaultPageWrapper>
    )
  }

  return (
    <DefaultPageWrapper>
      <HomeBar/>
      <Title my={"1rem"} align={"center"} order={2}>{formattedAmount}</Title>
      <HomeTransactionDate/>
      <HomeSections/>
    </DefaultPageWrapper>
  )
}

export default Home

