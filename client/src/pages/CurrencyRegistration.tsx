import {Center, Paper} from "@mantine/core";
import AuthBackground from "../assets/authBackground.jpg";
import CurrencyRegistrationForm from "../components/CurrencyRegistrationForm";
import {useAppSelector} from "../hooks/storeHooks";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const CurrencyRegistration = () => {
  const navigate = useNavigate()
  const userCurrency = useAppSelector(state => state.userSlice.user.currency)
  const isAuth = useAppSelector(state => state.userSlice.isAuth)
  const animationsVariants = AnimationService.fadeInDown({})

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
      <AnimatedWrapper whileInView={"whileInView"} initial={"initial"} variants={animationsVariants}>
        <Paper m={"1rem"} shadow="xl" radius="md" p="xl">
          <CurrencyRegistrationForm/>
        </Paper>
      </AnimatedWrapper>
    </Center>
  )
}

export default CurrencyRegistration
