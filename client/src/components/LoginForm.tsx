import {Box, Button, Group, LoadingOverlay, PasswordInput, Text, TextInput, Title} from '@mantine/core'
import {useForm} from '@mantine/form'
import {useRef, useEffect} from "react";
import {Link} from 'react-router-dom';
import {LoginFormValues} from "../types/sliceTypes/user.type";
import {useLoginMutation} from "../api/authApi";
import {ApiError} from "../types/ui.type";
import AuthService from "../services/authService";
import NotificationService from "../services/notificationService";

const LoginForm = () => {
  const [login, {error, isLoading}] = useLoginMutation()
  const passportInputRef = useRef<HTMLInputElement>()
  const form = useForm(AuthService.getLoginFormConfig());

  useEffect(() => {
    if(error) NotificationService.sendErrorNotification(error as ApiError)
  }, [error]);

  const submit = async (values: LoginFormValues) => {
    await login(values)
  }

  return (
    <Box sx={{position: "relative", padding: ".1rem"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <form onSubmit={form.onSubmit(submit)}>
        <Title order={2} sx={{fontSize: "2.5rem", fontWeight: 500}} align={"center"}>Continue</Title>
        <Text mb={"1rem"} align={"center"} weight={"300"}>
          Don't have an account? &nbsp;
          <Text color={"#238BE6"} weight={500} component={Link} to={"/registration"}>Sign up</Text>
        </Text>
        <TextInput
          mt="md"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          label="Password"
          placeholder="Super secret password"
          ref={passportInputRef}
          {...form.getInputProps('password')}
        />
        <Group position="center" mt="lg">
          <Button fullWidth size={"md"} type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  )
}

export default LoginForm
