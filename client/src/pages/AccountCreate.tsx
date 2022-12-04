import {Center, Paper, Title, useMantineTheme} from "@mantine/core";
import AccountCreateForm from "../components/AccountCreateForm";
import FormHeader from "../components/FormHeader";
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const AccountCreate = () => {
  const theme = useMantineTheme()
  const animationsVariants = AnimationService.fadeInDown({})

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <AnimatedWrapper whileInView={"whileInView"} initial={"initial"} variants={animationsVariants}>
        <Paper sx={{maxWidth: 700, width: "90%"}} shadow="xl" radius="md" p="xl">
          <FormHeader title={"New account"} goBackPath={"/accounts"}/>
          <AccountCreateForm/>
        </Paper>
      </AnimatedWrapper>
    </Center>
  )
}

export default AccountCreate
