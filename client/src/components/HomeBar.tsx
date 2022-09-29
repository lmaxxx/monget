import {Group} from "@mantine/core";
import AccountSelect from "./AccountSelect";
import {useAppSelector} from "../hooks/storeHooks";
import AccountIcon from "./AccountIcon";


const HomeBar = () => {
  const activeAccount = useAppSelector(state => state.accountSlice.activeAccount)

  return (
    <Group position={"center"}>
      <AccountIcon
        iconName={activeAccount.iconName}
        backgroundColor={activeAccount.iconBackgroundColor}
        size={"2rem"}
      />
      <AccountSelect/>
    </Group>
  )
}

export default HomeBar
