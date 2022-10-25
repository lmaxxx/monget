import {FC} from 'react'
import {CloseButton, Group, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";

interface PropsType {
  title: string
  goBackPath: string
}

const FormHeader: FC<PropsType> = ({title, goBackPath}) => {
  const navigate = useNavigate()
  const goBack = () => navigate(goBackPath)

  return (
    <Group position={"apart"}>
      <Title order={2} sx={{fontSize: "2rem", fontWeight: 500}} align={"center"}>{title}</Title>
      <CloseButton color={"red"} size={"lg"} onClick={goBack} aria-label="Close transfers" />
    </Group>
  )
}

export default FormHeader
