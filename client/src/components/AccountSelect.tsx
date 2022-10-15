import {Group, Select} from "@mantine/core"
import AccountSelectItem from "./AccountSelectItem"
import {FC} from "react"
import {AccountSelectItemProps} from "../types/ui.type";
import AccountIcon from "./AccountIcon";
import {useAppSelector} from "../hooks/storeHooks";

interface PropsType {
  setActiveAccountId: (newValue: any) => void
  activeAccountId: string | null
  width?: string
  data: AccountSelectItemProps[]
  placeholder?: string
  [x: string]: any
}

const AccountSelect: FC<PropsType> = ({
  setActiveAccountId,
  activeAccountId,
  width,
  data,
  ...others
}) => {
  const accounts = useAppSelector(state => state.accountSlice.accounts)
  const activeAccount = accounts.find(account => account.id === activeAccountId)

  return (
    <Group position={"center"}>
      <AccountIcon
        iconName={activeAccount?.iconName || "IconCash"}
        backgroundColor={activeAccount?.iconBackgroundColor}
        size={"2rem"}
      />
      <Select
        {...others}
        sx={{width}}
        data={data}
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
    </Group>

  )
}

export default AccountSelect
