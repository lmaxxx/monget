import {FC, ReactNode, useState} from 'react'
import {AppShell} from '@mantine/core'
import {useAppSelector} from "../hooks/storeHooks"
import VerifyEmailScreen from "../components/VerifyEmailScreen"
import NavigationBar from "../components/NavigationBar";
import Header from '../components/Header'

interface PropsType {
  children: ReactNode
}

const DefaultPageWrapper: FC<PropsType> = ({children}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const user = useAppSelector(state => state.userSlice.user)
  const isAuth = useAppSelector(state => state.userSlice.isAuth)

  if (!user?.isActivated && isAuth) return <VerifyEmailScreen/>

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={<NavigationBar opened={opened}/>}
      header={<Header opened={opened} setOpened={setOpened}/>}
    >
      {children}
    </AppShell>
  )
}

export default DefaultPageWrapper
