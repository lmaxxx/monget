import {createStyles, Navbar} from '@mantine/core';
import {FC, useEffect} from "react";
import NavigationLinks from "./NavigationLinks";
import BottomNavigationSection from "./BottomNavigationSection";
import AnimatedWrapper from "../hoc/AnimatedWrapper";
import AnimationService from "../services/animationService";
import {useMediaQuery} from "@mantine/hooks";

interface PropsType {
  opened: boolean
}

const useStyles = createStyles((theme) => ({
  links: {
    margin: -theme.spacing.md,
    gap: 0
  },
}));

const NavigationBar: FC<PropsType> = ({opened}) => {
  const {classes} = useStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const animationsVariants = AnimationService.navbarSlide(isMobile)

  return (
    <AnimatedWrapper animate={opened ? "animate" : "initial"} initial={"initial"} variants={animationsVariants}>
      <Navbar
        p="md"
        hiddenBreakpoint="sm"

        sx={!opened && isMobile ? {position: "absolute", left: "-100%"} : {}} width={{sm: 250}}
      >
        <Navbar.Section grow className={classes.links}>
          <NavigationLinks/>
        </Navbar.Section>
        <Navbar.Section grow className={classes.links}>
          <BottomNavigationSection/>
        </Navbar.Section>
      </Navbar>
    </AnimatedWrapper>
  );
}

export default NavigationBar
