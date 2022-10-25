import {
  Box,
  Button,
  ColorPicker,
  LoadingOverlay,
  NumberInput, Stack,
  TextInput,
} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import CurrencySelect from "./CurrencySelect";
import {useForm} from "@mantine/form";
import colorsForPicker from "../data/colorsForPicker.json"
import {useEffect, useState} from "react";
import AccountService from "../services/accountService";
import {useCreateAccountMutation} from "../api/accountApi";
import {AccountCreatingFormValues} from "../types/form.type";
import AccountIconList from "./AccountIconList";
import {AccountIconType} from "../data/accountIcons";
import {useAppSelector} from "../hooks/storeHooks";

const AccountCreateForm = () => {
  const userCurrency = useAppSelector(state => state.userSlice.user.currency)
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>(colorsForPicker[1])
  const [activeIconName, setActiveIconName] = useState<AccountIconType>("IconCash")
  const form = useForm(AccountService.getAccountCreatingFormConfig())
  const [createAccount, {isLoading}] = useCreateAccountMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if(userCurrency) {
      form.setFieldValue("currency", userCurrency)
    }
  }, [userCurrency]);

  const createAccountSubmit = async (values: {[key: number]: string}) => {
    const data = {
      ...values,
      iconBackgroundColor,
      iconName: activeIconName
    } as AccountCreatingFormValues

    await createAccount(data)
    navigate("/accounts")
  }

  return (
    <div style={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Box sx={{
        overflow: "auto",
        height: 450,
        position: "relative",
        padding: ".1rem"
      }}>
        <form onSubmit={form.onSubmit(createAccountSubmit)}>
          <TextInput
            mb={"sm"}
            label="Name"
            placeholder="My credit card"
            {...form.getInputProps("accountName")}
          />
          <CurrencySelect label={"Currency"} form={form}/>
          <NumberInput
            mt={"sm"}
            placeholder="1251"
            label="Amount"
            {...form.getInputProps("amount")}
          />
          <Stack align={"center"}>
            <ColorPicker
              mt={"sm"}
              swatchesPerRow={6}
              format="hex"
              value={iconBackgroundColor}
              onChange={setIconBackgroundColor}
              swatches={colorsForPicker}
            />
            <AccountIconList
              activeIconName={activeIconName}
              setActiveIconName={setActiveIconName}
              backgroundColor={iconBackgroundColor}
            />
            <Button fullWidth size={"md"} type="submit">Create</Button>
          </Stack>
        </form>
      </Box>
    </div>
  )
}

export default AccountCreateForm
