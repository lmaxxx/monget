import {Center, Paper} from "@mantine/core";
import AuthBackground from '../assets/authBackground.jpg'
import LoginForm from "../components/LoginForm";
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const Login = () => {
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
          <LoginForm/>
        </Paper>
      </AnimatedWrapper>

    </Center>
  )
}

export default Login
