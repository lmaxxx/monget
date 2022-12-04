import {Center, Paper, useMantineTheme} from "@mantine/core";
import FormHeader from "../components/FormHeader";
import CategoryEditForm from "../components/CategoryEditForm";
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const CategoryEdit = () => {
  const theme = useMantineTheme()
  const animationsVariants = AnimationService.fadeInDown({})

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <AnimatedWrapper whileInView={"whileInView"} initial={"initial"} variants={animationsVariants}>
        <Paper sx={{maxWidth: 600, width: "90%"}} shadow="xl" radius="md" p="xl">
          <FormHeader title={"Category settings"} goBackPath={"/categories"}/>
          <CategoryEditForm/>
        </Paper>
      </AnimatedWrapper>
    </Center>
  )
}

export default CategoryEdit
