import {FC} from 'react'
import {Box, CloseButton, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import HiddenTextStyles from "../assets/hiddenTextStyles";

interface PropsType {
  title: string
  goBackPath: string
}

const FormHeader: FC<PropsType> = ({title, goBackPath}) => {
  const navigate = useNavigate()
  const goBack = () => navigate(goBackPath)

  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns: "auto 34px",
      alignItems: "center",
      gap: "1rem",
    }}>
      <Title order={2} sx={{fontSize: "1.5rem", fontWeight: 500, ...HiddenTextStyles}}>{title}</Title>
      <CloseButton color={"red"} size={"lg"} onClick={goBack} aria-label="Close transfers"/>
    </Box>
  )
}

export default FormHeader
