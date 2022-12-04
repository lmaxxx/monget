import {FC, ReactNode, useEffect, useState} from 'react'
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  Image
} from '@mantine/core'
import {useAppSelector} from "../hooks/storeHooks"
import VerifyEmailScreen from "../components/VerifyEmailScreen"
import NavigationBar from "../components/NavigationBar";
import LogoWithName from '../assets/logoWithName.png'
import {useMediaQuery} from "@mantine/hooks";

interface PropsType {
  children: ReactNode
}

const DefaultPageWrapper: FC<PropsType> = ({children}) => {
  const [opened, setOpened] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)');
  const user = useAppSelector(state => state.userSlice.user)
  const isAuth = useAppSelector(state => state.userSlice.isAuth)

  useEffect(() => {
    isMobile && opened ? setOpened(false) : setOpened(true)
  }, [isMobile]);

  if(!user?.isActivated && isAuth) return <VerifyEmailScreen/>

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<NavigationBar opened={opened}/>}
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={"#ccc"}
                mr="xl"
              />
            </MediaQuery>
            <Image width={"10rem"} src={LogoWithName} alt={"logo"}/>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default DefaultPageWrapper
