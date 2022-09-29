import {Container, Skeleton} from "@mantine/core";

const AccountsSkeleton = () => {
  const arrForSkeletonRendering = new Array(9).fill(undefined)

  return (
    <Container px={0} py={"xs"} mt={"lg"}>
      {
        arrForSkeletonRendering.map((_, index) => (
          <Skeleton radius={"md"} mb={"md"} height={"58px"} key={index} />
        ))
      }
    </Container>
  )
}

export default AccountsSkeleton
