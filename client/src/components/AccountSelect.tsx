import {Select} from "@mantine/core"
import AccountSelectItem from "./AccountSelectItem"
import {FC} from "react"
import {AccountSelectItemProps} from "../types/ui.type";

interface PropsType {
  setActiveAccountId: (newValue: any) => void
  activeAccountId: string | null
  width?: string
  data: AccountSelectItemProps[]
}

const AccountSelect: FC<PropsType> = ({setActiveAccountId, activeAccountId, width, data}) => {
  return (
    <Select
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
  )
}

export default AccountSelect
