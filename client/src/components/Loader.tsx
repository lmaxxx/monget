import { Center, Loader as LoaderUiComponent } from "@mantine/core"
import {FC} from "react";

interface PropsType {
  height?: string,
  width?: string
}

const Loader: FC<PropsType> = ({
  width = "100%",
  height = "100vh"
                }) => {
  return (
    <Center style={{width, height, flexDirection: "column", alignItems: "center"}}>
      <LoaderUiComponent mt={"1rem"} size="xl" />
    </Center>
  )
}

export default Loader
