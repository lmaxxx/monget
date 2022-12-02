import {Center, Paper} from "@mantine/core";
import AuthBackground from "../assets/authBackground.jpg";
import CurrencyRegistrationForm from "../components/CurrencyRegistrationForm";
import {useAppSelector} from "../hooks/storeHooks";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const CurrencyRegistration = () => {
  const navigate = useNavigate()
  const userCurrency = useAppSelector(state => state.userSlice.user.currency)
  const isAuth = useAppSelector(state => state.userSlice.isAuth)

  useEffect(() => {
    if(userCurrency && isAuth) return navigate("/")
    if(!userCurrency && !isAuth) return navigate("/registration")
  }, [userCurrency]);

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
