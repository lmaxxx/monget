import {Box, Button, LoadingOverlay, Title} from "@mantine/core";
import CurrencySelect from "./CurrencySelect";
import {useForm} from "@mantine/form";
import {CurrencyRegistrationFormValues} from "../types/sliceTypes/user.type";
import AuthService from "../services/authService";
import {useAppSelector} from "../hooks/storeHooks";
import {useEffect} from "react";
import {useUpdateCurrencyMutation} from "../api/authApi";

const CurrencyEditForm = () => {
  const userCurrency = useAppSelector(state => state.userSlice.user.currency)
  const form = useForm<CurrencyRegistrationFormValues>(AuthService.getCurrencyRegistrationFormConfig(userCurrency))
  const [updateCurrency, {isLoading}] = useUpdateCurrencyMutation()

  useEffect(() => {
    if (!form.values.currency) {
      form.setFieldValue("currency", userCurrency)
    }
  }, [userCurrency]);

  const updateCurrencySubmit = async (values: CurrencyRegistrationFormValues) => {
    await updateCurrency(values)
  }

  return (
    <Box sx={{maxWidth: "400px", width: "100%"}} p={"1rem"} style={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Box
        id={"changeCurrency"}
        component={"form"}
        onSubmit={form.onSubmit(updateCurrencySubmit)}
      >
        <Title mb={"md"} align={"center"}>Update your main currency</Title>
        <CurrencySelect label={"Currency"} form={form}/>
        <Button form={"changeCurrency"} mt={"md"} fullWidth size={"sm"} type="submit">Update</Button>
      </Box>
    </Box>
  )
}

export default CurrencyEditForm
