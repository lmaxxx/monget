import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import HomeBar from "../components/HomeBar";
import HomeSkeleton from "../components/HomeSkeleton";
import {useAppSelector} from "../hooks/storeHooks";
import {useGetAccountsQuery} from "../api/accountApi";
import {Title} from '@mantine/core'
import AccountService from "../services/accountService";
import HomeSections from "../components/HomeSections";
import {TransactionRequestDateType} from "../types/sliceTypes/transaction.type";
import ChooseDateModel from "../components/ChooseDateModel";

const Home = () => {
  useGetAccountsQuery()
  const accountLength = useAppSelector(state => state.accountSlice.accounts.length)
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)
  const formattedAmount = AccountService.getFormattedAmount(activeAccount.amount, activeAccount.currency)

  if(!accountLength) {
    return (
      <DefaultPageWrapper>
        <HomeSkeleton/>
      </DefaultPageWrapper>
    )
  }

  return (
    <DefaultPageWrapper>
      <HomeBar/>
      <Title my={"1rem"} align={"center"} order={2}>{formattedAmount}</Title>
      <HomeSections/>
      <ChooseDateModel opened={true} activeTransactionRequestDate={TransactionRequestDateType.Range}/>
    </DefaultPageWrapper>
  // <DefaultPageWrapper>
  //   <HomeSkeleton/>
  // </DefaultPageWrapper>
  )
}

export default Home

