import {createStyles, Navbar} from '@mantine/core';
import {FC, useEffect} from "react";
import NavigationLinks from "./NavigationLinks";
import BottomNavigationSection from "./BottomNavigationSection";
import AnimatedWrapper from "../hoc/AnimatedWrapper";
import AnimationService from "../services/animationService";
import {useMediaQuery, useScrollLock} from "@mantine/hooks";

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
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const {classes} = useStyles();
  const animationsVariants = AnimationService.navbarSlide()
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    opened ? setScrollLocked(true) : setScrollLocked(false)
  }, [opened]);

  return (
    <AnimatedWrapper animate={opened && isMobile ? "animate" : ""} initial={isMobile ? "initial" : ""} variants={animationsVariants}>
      <Navbar p="md" hiddenBreakpoint="sm" width={{sm: 250}}>
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
