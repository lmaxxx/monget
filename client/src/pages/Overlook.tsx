import {Center, Button} from "@mantine/core";
import OverlookCarousel from "../components/OverlookCarousel";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {useEffect} from "react";

const Overlook = () => {
  const navigate = useNavigate()
  const isAuth = useAppSelector(state => state.userSlice.isAuth)

  useEffect(() => {
    if(isAuth) navigate("/")
  }, [isAuth]);

  const redirectToRegistration = () => {
    navigate("/registration")
  }

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      position: "relative",
      flexDirection: "column"
    }}>
      <svg style={{position: "absolute", top: 0, zIndex: -1}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#2089E5" fillOpacity="1" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,101.3C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
      <OverlookCarousel/>
      <Button onClick={redirectToRegistration} size={"lg"} mt={"2rem"} variant={"light"}>Try it out</Button>
      <svg style={{position: "absolute", bottom: 0, zIndex: -1}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#2089E5" fillOpacity="1" d="M0,224L48,229.3C96,235,192,245,288,245.3C384,245,480,235,576,234.7C672,235,768,245,864,256C960,267,1056,277,1152,261.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </Center>
  )
}

export default Overlook
