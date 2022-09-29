import {FC, useMemo} from 'react'
import AccountIcon from "./AccountIcon";
import accountIcons from "../data/accountIcons";
import {AccountIconName} from "../types/ui.type";
import {Group} from "@mantine/core";

interface PropsType {
  activeIconName?: string
  setActiveIconName: (newValue: any) => any
  backgroundColor?: string
}

const AccountIconList: FC<PropsType> = ({activeIconName, setActiveIconName, backgroundColor}) => {
  const iconNames = useMemo(() => Object.keys(accountIcons), []) as AccountIconName[]

  return (
    <Group position={"center"}>
      {
        iconNames.map(name => {
          return <AccountIcon
            key={name}
            backgroundColor={backgroundColor!}
            iconName={name}
            size={"3rem"}
            isActive={activeIconName === name}
            onClick={setActiveIconName.bind(this, name)}
          />
        })
      }
    </Group>
  )
}

export default AccountIconList
