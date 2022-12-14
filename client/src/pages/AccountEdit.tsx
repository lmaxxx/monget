import {Center, Paper, useMantineTheme} from "@mantine/core";
import AccountEditForm from "../components/AccountEditForm";
import FormHeader from "../components/FormHeader";
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const AccountEdit = () => {
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
          <FormHeader title={"Account settings"} goBackPath={"/accounts"}/>
          <AccountEditForm/>
        </Paper>
      </AnimatedWrapper>
    </Center>
  )
}

export default AccountEdit
