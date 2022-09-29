import {Group, Skeleton} from "@mantine/core";

const HomeSkeleton = () => {
  return (
    <>
      <Group position={"center"}>
        <Skeleton height={"2rem"} width={"2rem"}/>
        <Skeleton width={"195px"} height={"2rem"}/>
      </Group>
      <Group position={"center"}>
        <Skeleton my={"1rem"} width={"100px"} height={"2.5rem"}/>
      </Group>
    </>
  )
}

export default HomeSkeleton
