import {Group} from "@mantine/core";
import {useGetAccountsQuery} from "../api/accountApi";
import AccountListItem from "./AccountListItem";
import AccountsSkeleton from "./AccountsSkeleton";
import {useAppSelector} from "../hooks/storeHooks";

const AccountList = () => {
  const {isLoading} = useGetAccountsQuery()
  const accounts = useAppSelector(state => state.accountSlice.accounts)

  if (isLoading) return <AccountsSkeleton/>

  return (
    <Group py={"xs"} mt={"lg"}>
      {
        accounts?.map(account => <AccountListItem key={account.id} account={account}/>)
      }
    </Group>
  )
}

export default AccountList
