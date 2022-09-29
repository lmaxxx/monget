import {createStyles, Navbar, ScrollArea} from '@mantine/core';
import {FC} from "react";
import NavigationLinks from "./NavigationLinks";

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
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200}}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <NavigationLinks/>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavigationBar
