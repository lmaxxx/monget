import {createStyles, Navbar} from '@mantine/core';
import {FC} from "react";
import NavigationLinks from "./NavigationLinks";
import BottomNavigationSection from "./BottomNavigationSection";

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

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 250}}>
      <Navbar.Section grow className={classes.links}>
        <NavigationLinks/>
      </Navbar.Section>
      <Navbar.Section grow className={classes.links}>
        <BottomNavigationSection/>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavigationBar
