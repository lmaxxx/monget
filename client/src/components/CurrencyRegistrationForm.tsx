import {Button, Group, LoadingOverlay, Text, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import AuthService from "../services/authService";
import {useUpdateCurrencyMutation} from "../api/authApi";
import {useEffect} from "react";
import NotificationService from "../services/notificationService";
import {ApiError} from "../types/sliceTypes/user.type";
import {CurrencyRegistrationFormValues} from "../types/form.type";
import CurrencySelect from "./CurrencySelect";

const CurrencyRegistrationForm = () => {
  const form = useForm(AuthService.getCurrencyRegistrationFormConfig());
  const [updateCurrency, {error, isLoading}] = useUpdateCurrencyMutation()

  useEffect(() => {
    if(error) NotificationService.sendErrorNotification(error as ApiError)
  }, [error]);

  const submit = async (values: CurrencyRegistrationFormValues) => {
    await updateCurrency(values)
  }

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Title order={2} sx={{fontSize: "2.5rem", fontWeight: 500}} align={"center"}>Last step</Title>
      <Text mb={"1rem"} align={"center"} weight={"300"}>
        Choose your main currency before start
      </Text>
      <CurrencySelect form={form} />
      <Group position="center" mt="1rem">
        <Button size={"md"} type="submit">Choose</Button>
      </Group>
    </form>
  )
}

export default CurrencyRegistrationForm
