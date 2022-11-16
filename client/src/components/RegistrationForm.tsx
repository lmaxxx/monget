import {Box, Button, Group, LoadingOverlay, PasswordInput, TextInput, Title, Text} from '@mantine/core'
import {useForm} from '@mantine/form'
import {useEffect, useRef} from "react";
import {Link} from 'react-router-dom';
import {RegistrationFormValues} from "../types/sliceTypes/user.type";
import {useRegistrationMutation} from "../api/authApi";
import {ApiError} from "../types/ui.type";
import AuthService from "../services/authService";
import NotificationService from "../services/notificationService";

const RegistrationForm = () => {
  const [registration, {error, isLoading}] = useRegistrationMutation()
  const passportInputRef = useRef<HTMLInputElement>()
  const form = useForm<RegistrationFormValues>(AuthService.getRegistrationFormConfig(passportInputRef))

  useEffect(() => {
    if(error) NotificationService.sendErrorNotification(error as ApiError)
  }, [error]);

  const submit = async (values: RegistrationFormValues) => {
    await registration(values)
  }

  return (
    <Box sx={{position: "relative", padding: ".1rem"}}>
      <form onSubmit={form.onSubmit(submit)}>
        <Title order={2} sx={{fontSize: "2.5rem", fontWeight: 500}} align={"center"}>Get started</Title>
        <Text mb={"1rem"} align={"center"} weight={"300"}>
          Already have an account? &nbsp;
          <Text color={"#238BE6"} weight={500} component={Link} to={"/login"}>Sign in</Text>
        </Text>
        <LoadingOverlay visible={isLoading} overlayBlur={2}/>
        <TextInput
          label="Name"
          placeholder="George"
          {...form.getInputProps('name')}
        />
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
        <PasswordInput
          mt="md"
          label="Repeat password"
          placeholder="Super secret password"
          {...form.getInputProps('repeatPassword')}
        />
        <Group position="center" mt="lg">
          <Button size={"md"} fullWidth type="submit">Create account</Button>
        </Group>
      </form>
    </Box>
  )
}

export default RegistrationForm
