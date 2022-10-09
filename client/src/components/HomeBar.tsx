import {Group} from "@mantine/core";
import HomeAccountSelect from "./HomeAccountSelect";
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
      <HomeAccountSelect/>
    </Group>
  )
}

export default HomeBar
