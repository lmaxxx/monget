import {FC, useMemo} from 'react'
import AccountIcon from "./AccountIcon";
import accountIcons, {AccountIconType} from "../data/accountIcons";
import {Group} from "@mantine/core";

interface PropsType {
  activeIconName?: string
  setActiveIconName: (newValue: any) => any
  backgroundColor?: string
}

const AccountIconList: FC<PropsType> = ({activeIconName, setActiveIconName, backgroundColor}) => {
  const iconNames = useMemo(() => Object.keys(accountIcons), []) as AccountIconType[]

  return (
    <Group position={"center"}>
      {
        iconNames.map(name => {
          return <AccountIcon
            key={name}
            backgroundColor={backgroundColor!}
            iconName={name}
            backgroundSize={"3rem"}
            iconSize={"2rem"}
            isActive={activeIconName === name}
            onClick={setActiveIconName.bind(this, name)}
            style={{cursor: "pointer"}}
          />
        })
      }
    </Group>
  )
}

export default AccountIconList
