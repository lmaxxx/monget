import {Center, Paper} from "@mantine/core";
import AuthBackground from '../assets/authBackground.jpg'
import RegistrationForm from "../components/RegistrationForm";
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const Registration = () => {
  const animationsVariants = AnimationService.fadeInDown({})

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      background: `url(${AuthBackground}) no-repeat center`,
      backgroundSize: "cover"
    }}>
      <AnimatedWrapper whileInView={"whileInView"} initial={"initial"} variants={animationsVariants}>
        <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
          <RegistrationForm/>
        </Paper>
      </AnimatedWrapper>
    </Center>
  )
}

export default Registration
