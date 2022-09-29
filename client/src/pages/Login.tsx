import {Center, Paper} from "@mantine/core";
import AuthBackground from '../assets/authBackground.jpg'
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      background: `url(${AuthBackground}) no-repeat center`,
      backgroundSize: "cover"
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <LoginForm/>
      </Paper>
    </Center>
  )
}

export default Login
