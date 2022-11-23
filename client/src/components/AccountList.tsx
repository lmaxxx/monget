import {Group} from "@mantine/core";
import {useLazyGetAccountsQuery} from "../api/accountApi";
import AccountListItem from "./AccountListItem";
import AccountsSkeleton from "./AccountsSkeleton";
import {useAppSelector} from "../hooks/storeHooks";
import {useEffect} from "react";

const AccountList = () => {
  const [getAccounts, {isLoading}] = useLazyGetAccountsQuery()
  const accounts = useAppSelector(state => state.accountSlice.accounts)

  useEffect(() => {
    if(!accounts.length) getAccounts()
  }, []);

  if(isLoading || !accounts.length) return <AccountsSkeleton/>

  return (
    <Group py={"xs"} mt={"lg"}>
      {
        accounts?.map(account => <AccountListItem key={account.id} account={account}/>)
      }
    </Group>
  )
}

export default AccountList
