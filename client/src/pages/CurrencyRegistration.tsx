import {Center, Paper} from "@mantine/core";
import AuthBackground from "../assets/authBackground.jpg";
import CurrencyRegistrationForm from "../components/CurrencyRegistrationForm";

const CurrencyRegistration = () => {
  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      background: `url(${AuthBackground}) no-repeat center`,
      backgroundSize: "cover"
    }}>
      <Paper m={"1rem"} shadow="xl" radius="md" p="xl">
        <CurrencyRegistrationForm/>
      </Paper>
    </Center>
  )
}

export default CurrencyRegistration
