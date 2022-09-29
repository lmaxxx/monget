import {
  Box,
  Button,
  ColorPicker,
  Group,
  LoadingOverlay,
  NumberInput, Stack,
  TextInput,
} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import CurrencySelect from "./CurrencySelect";
import {useForm} from "@mantine/form";
import colorsForPicker from "../data/colorsForPicker.json"
import {useState} from "react";
import {AccountIconName} from "../types/ui.type";
import AccountService from "../services/accountService";
import {useCreateAccountMutation} from "../api/accountApi";
import {AccountCreatingFormValues} from "../types/form.type";
import AccountIconList from "./AccountIconList";

const AccountCreateForm = () => {
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>(colorsForPicker[1])
  const [activeIconName, setActiveIconName] = useState<AccountIconName>("cash")
  const form = useForm(AccountService.getAccountCreatingFormConfig())
  const [createAccount, {isLoading}] = useCreateAccountMutation()
  const navigate = useNavigate()

  const submit = async (values: {[key: number]: string}) => {
    const data = {
      ...values,
      iconBackgroundColor,
      iconName: activeIconName
    } as AccountCreatingFormValues

    await createAccount(data)
    navigate(-1)
  }

  return (
    <Box sx={{
      overflow: "auto",
      height: 450,
      position: "relative",
      padding: ".1rem"
    }}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <form onSubmit={form.onSubmit(submit)}>
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
          <Button
            size={"md"}
            fullWidth
            component={Link}
            to={"/accounts"}
            color={"red"}
            variant={"outline"}
          >Go back</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default AccountCreateForm
