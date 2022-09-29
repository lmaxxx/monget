import {Group} from "@mantine/core";
import links from '../data/links'
import {ILink} from "../types/ui.type";
import NavigationLink from "./NavigationLink";

const NavigationLinks = () => {
  return (
    <Group sx={{gap: "0.5rem"}} position={"left"} align={"center"}>
      {
        links.map((link: ILink) => <NavigationLink key={link.label} link={link}/>)
      }
    </Group>
  )
}

export default NavigationLinks
