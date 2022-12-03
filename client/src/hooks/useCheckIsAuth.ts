import {useLocation, useNavigate} from 'react-router-dom'
import {useCheckAuthMutation} from "../api/authApi";
import {useEffect} from "react";
import {useAppSelector} from "./storeHooks";

const useCheckIsAuth = () => {
  const navigate = useNavigate()
  const [getUserFromDb, {isLoading}] = useCheckAuthMutation()
  const isAuth = useAppSelector(state => state.userSlice.isAuth)
  const user = useAppSelector(state => state.userSlice.user)
  const location = useLocation()

  const checkIsAuth = async () => {
    if(localStorage.getItem("token")) {
      await getUserFromDb()
    }
  }

  useEffect(() => {
    if(isAuth && !user?.currency) return navigate("/currency/registration")

    if(isAuth && location.pathname.startsWith("/registration") ||
      location.pathname.startsWith("/login")) {

      return navigate("/")
    }

    if(!JSON.parse(localStorage.getItem("visited")!)) {
      localStorage.setItem("visited", "true")
      return navigate("/overlook")
    }

    if(isAuth === false || !localStorage.getItem("token")) navigate("/registration")

  }, [isAuth, user])

  return {checkIsAuth, isLoading}
}

export default useCheckIsAuth
