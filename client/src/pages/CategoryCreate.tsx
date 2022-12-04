import {Center, Paper, useMantineTheme} from "@mantine/core";
import FormHeader from "../components/FormHeader";
import CategoryCreateForm from "../components/CategoryCreateForm";
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const CategoryCreate = () => {
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
          <FormHeader title={"Create category"} goBackPath={"/categories"}/>
          <CategoryCreateForm/>
        </Paper>
      </AnimatedWrapper>
    </Center>
  )
}

export default CategoryCreate
