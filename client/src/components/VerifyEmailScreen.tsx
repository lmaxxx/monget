import {Center, Image, Text, Title} from "@mantine/core";
import MailSent from "../assets/mailSent.svg";
import {useAppSelector} from "../hooks/storeHooks";

const VerifyEmailScreen = () => {
  const user = useAppSelector(state => state.userSlice.user)

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      flexDirection: "column"
    }}>
      <Image src={MailSent} alt={"Mail"} width={200} fit="contain"/>
      <Title mt={"2rem"} mb={"0.5rem"} sx={{fontSize: "2.5rem", fontWeight: 500}} order={2} align={"center"}>Verify your email</Title>
      <Text mb={"0.5rem"} align={"center"} weight={"300"}>
        To continue using Monget, please verify your email address:
      </Text>
      <Text color={"#2089E5"} align={"center"} weight={"600"}>{user?.email}</Text>
    </Center>
  )
}

export default VerifyEmailScreen
