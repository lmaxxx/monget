import {Button, Center, Image, Text, Title} from "@mantine/core";
import MailSent from "../assets/mailSent.svg";
import {useAppSelector} from "../hooks/storeHooks";
import {useState} from "react";
import UpdateEmailForm from "./UpdateEmailForm";
import AnimatedWrapper from "../hoc/AnimatedWrapper";
import AnimationService from "../services/animationService";

const VerifyEmailScreen = () => {
  const user = useAppSelector(state => state.userSlice.user)
  const [showUpdateEmailForm, setShowUpdateEmailForm] = useState<boolean>(false)
  const animationsVariants = AnimationService.fadeInRight({})

  const openUpdateEmailForm = () => {
    setShowUpdateEmailForm(true)
  }

  return (
    <Center sx={{
      height: "100vh",
      width: "100%",
      flexDirection: "column"
    }}>
      <AnimatedWrapper whileInView={"whileInView"} initial={"initial"} variants={animationsVariants}>
        <Center sx={{flexDirection: "column"}}>
          <Image src={MailSent} alt={"Mail"} width={200} fit="contain"/>
          <Title mt={"2rem"} mb={"0.5rem"} sx={{fontSize: "2.5rem", fontWeight: 500}} order={2} align={"center"}>Verify
            your email</Title>
          <Text mb={"0.5rem"} align={"center"} weight={"300"}>
            To continue using Monget, please verify your email address:
          </Text>
          <Text color={"#2089E5"} align={"center"} weight={"600"}>{user?.email}</Text>
          <Button disabled={showUpdateEmailForm} mt={"sm"} color={"gray"} onClick={openUpdateEmailForm}>Resend to
            another email</Button>
          {showUpdateEmailForm && <UpdateEmailForm/>}
        </Center>
      </AnimatedWrapper>
    </Center>
  )
}

export default VerifyEmailScreen
