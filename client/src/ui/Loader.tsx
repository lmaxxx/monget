import { Center, Loader as LoaderUiComponent } from "@mantine/core"

const Loader = () => {
  return (
    <Center style={{width: "100%", height: "100vh", flexDirection: "column", alignItems: "center"}}>
      <LoaderUiComponent mt={"1rem"} size="xl" />
    </Center>
  )
}

export default Loader
