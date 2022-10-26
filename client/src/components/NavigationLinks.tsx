import {Stack} from "@mantine/core";
import links from '../data/links'
import {ILink} from "../types/ui.type";
import NavigationLink from "./NavigationLink";

const NavigationLinks = () => {
  return (
    <Stack sx={{gap: "0.5rem"}} align={"center"}>
      {
        links.map((link: ILink) => <NavigationLink key={link.label} link={link}/>)
      }
    </Stack>
  )
}

export default NavigationLinks
