import {Button, Stack, Text} from "@mantine/core";
import {IconLogout} from "@tabler/icons";
import {useAppSelector} from "../hooks/storeHooks";
import HiddenTextStyles from "../assets/hiddenTextStyles";
import {useLogoutMutation} from "../api/authApi";
import {memo} from "react";

const BottomNavigationSection = () => {
  const userName = useAppSelector(state => state.userSlice.user.name)
  const [logout] = useLogoutMutation()

  const logoutEvent = () => logout()

  return (
    <Stack justify={"flex-end"} sx={{gap: "0.5rem", height: "100%"}}>
      <Text px={"sm"} sx={{...HiddenTextStyles}} align={"center"}>{userName}</Text>
      <Button
        leftIcon={<IconLogout/>}
        onClick={logoutEvent}
        variant={"light"}
        color={"orange"}
        fullWidth
        size={"md"}
        radius={"xs"}
        sx={{height: "50px"}}
      >Logout</Button>
    </Stack>
  )
}

export default memo(BottomNavigationSection)
