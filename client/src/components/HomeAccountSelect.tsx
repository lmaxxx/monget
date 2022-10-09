import {useEffect, useMemo, useState} from "react"
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks"
import {setActiveAccount} from "../store/accountSlice"
import AccountSelect from "./AccountSelect";
import AccountService from "../services/accountService";

const HomeAccountSelect = () => {
  const dispatch = useAppDispatch()
  const accounts = useAppSelector(state => state.accountSlice.accounts)
  const dataForSelect = useMemo(() => AccountService.getAccountSelectItems(accounts), [accounts])
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(setActiveAccount(accounts[0].id))
    setActiveAccountId(accounts[0].id)
  }, [])

  useEffect(() => {
    if(activeAccountId) dispatch(setActiveAccount(activeAccountId))
  }, [activeAccountId])

  return (
    <AccountSelect
      width={"230px"}
      activeAccountId={activeAccountId}
      setActiveAccountId={setActiveAccountId}
      data={dataForSelect}
    />
  )
}

export default HomeAccountSelect
