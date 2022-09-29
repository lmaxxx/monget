import {Center, Paper} from "@mantine/core";
import AuthBackground from '../assets/authBackground.jpg'
import RegistrationForm from "../components/RegistrationForm";

const Registration = () => {
  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      background: `url(${AuthBackground}) no-repeat center`,
      backgroundSize: "cover"
    }}>
      <Paper sx={{maxWidth: 400, width: "90%"}} shadow="xl" radius="md" p="xl">
        <RegistrationForm/>
      </Paper>
    </Center>
  )
}

export default Registration
