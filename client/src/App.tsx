import Pages from "./pages/Pages";
import useCheckIsAuth from "./hooks/useCheckIsAuth";
import {useEffect} from "react";
import Loader from "./components/Loader";

function App() {
  const {checkIsAuth, isLoading} = useCheckIsAuth()

  useEffect(() => {
    checkIsAuth()
  }, [])

  if (isLoading) return <Loader/>

  return (
    <Pages/>
  );
}

export default App;
