import {Box, Burger, Button, Header as HeaderComponent, Image, MediaQuery} from '@mantine/core'
import {IconArrowsMaximize, IconArrowsMinimize} from "@tabler/icons"
import LogoWithName from "../assets/logoWithName.png";
import {FC, memo} from "react";
import {useFullscreen} from "@mantine/hooks";
import NotificationService from "../services/notificationService";

interface PropsType {
  opened: boolean
  setOpened: (callback: (newValue: boolean) => boolean) => void
}

const Header: FC<PropsType> = ({opened, setOpened}) => {
  const {toggle, fullscreen} = useFullscreen();
  const toggleFullScreen = () => {
    if (fullscreen) NotificationService.sendScrrenWarning()
    toggle()
  }

  const toggleHeader = () => {
    setOpened(oldValue => !oldValue)
  }

  return (
    <HeaderComponent height={70} p="md">
      <Box style={{display: 'flex', alignItems: 'center', height: '100%'}}>
        <MediaQuery largerThan="sm" styles={{display: 'none'}}>
          <Burger
            opened={opened}
            onClick={toggleHeader}
            size="sm"
            color={"#ccc"}
            mr="xl"
          />
        </MediaQuery>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <Image width={"10rem"} src={LogoWithName} alt={"logo"}/>
          <Button onClick={toggleFullScreen} p={4} variant={"outline"}>
            {fullscreen ? <IconArrowsMinimize/> : <IconArrowsMaximize/>}
          </Button>
        </Box>
      </Box>

    </HeaderComponent>
  )
}

export default memo(Header)
