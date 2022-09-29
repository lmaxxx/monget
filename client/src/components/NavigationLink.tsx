import {FC} from 'react'
import {Button} from '@mantine/core'
import {Link, useLocation} from 'react-router-dom'
import {ILink} from "../types/ui.type";

interface PropsType {
  link: ILink
}

const NavigationLink: FC<PropsType> = ({link}) => {
  const location = useLocation()
  const isActive = location.pathname.split("/")[1] === link.path.split("/")[1]

  return (
    <Button
      leftIcon={link.icon}
      variant={isActive ? "filled": "subtle"}
      fullWidth
      key={link.label}
      component={Link}
      to={link.path}
      size={"md"}
      radius={"xs"}
      sx={{height: "50px"}}
    >{link.label}</Button>
  )
}

export default NavigationLink
