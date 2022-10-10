import {Group} from "@mantine/core";
import HomeAccountSelect from "./HomeAccountSelect";


const HomeBar = () => {
  return (
    <Group position={"center"}>
      <HomeAccountSelect/>
    </Group>
  )
}

export default HomeBar
