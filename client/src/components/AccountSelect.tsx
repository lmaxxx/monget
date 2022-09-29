import {Select} from "@mantine/core"
import AccountSelectItem from "./AccountSelectItem"
import {useEffect, useMemo, useState} from "react"
import {useAppDispatch, useAppSelector} from "../hooks/storeHooks"
import {setActiveAccount} from "../store/accountSlice"

const AccountSelect = () => {
  const dispatch = useAppDispatch()
  const accounts = useAppSelector(state => state.accountSlice.accounts)
  const dataForSelect = useMemo(() => accounts?.map(account => ({
    label: account.accountName,
    value: account.id,
    iconName: account.iconName,
    iconBackgroundColor: account.iconBackgroundColor
  })) as any, [accounts])
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(setActiveAccount(accounts[0].id))
    setActiveAccountId(accounts[0].id)
  }, [])

  useEffect(() => {
    if(activeAccountId) dispatch(setActiveAccount(activeAccountId))
  }, [activeAccountId])

  return (
    <Select
      sx={{width: "230px"}}
      data={dataForSelect}
      onChange={setActiveAccountId}
      value={activeAccountId}
      placeholder={"Pick one"}
      itemComponent={AccountSelectItem}
      variant={"unstyled"}
      dropdownPosition={"bottom"}
      styles={() => ({
        rightSection: {
          '&': {
            right: "-1.5rem"
          }
        }
      })}
    />
  )
}

export default AccountSelect
