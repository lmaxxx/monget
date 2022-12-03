import {Box, Button, ColorPicker, Group, LoadingOverlay, NumberInput, TextInput} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import CurrencySelect from "./CurrencySelect";
import {useForm} from "@mantine/form";
import colorsForPicker from "../data/colorsForPicker.json"
import {useEffect, useState} from "react";
import AccountService from "../services/accountService";
import {useCreateAccountMutation} from "../api/accountApi";
import {AccountCreatingBodyParams, AccountCreatingFormValues} from "../types/sliceTypes/account.type"
import AccountIconList from "./AccountIconList";
import {AccountIconType} from "../data/accountIcons";
import {useAppSelector} from "../hooks/storeHooks";
import {useMediaQuery} from "@mantine/hooks";
import getSymbolFromCurrency from "currency-symbol-map";

const AccountCreateForm = () => {
  const userCurrency = useAppSelector(state => state.userSlice.user.currency)
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>(colorsForPicker[1])
  const [activeIconName, setActiveIconName] = useState<AccountIconType>("IconCash")
  const form = useForm<AccountCreatingFormValues>(AccountService.getAccountFormConfig())
  const [createAccount, {isLoading}] = useCreateAccountMutation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 520px)');

  useEffect(() => {
    if (userCurrency) AccountService.setDefaultCreateForm(form, userCurrency)
  }, [userCurrency]);

  const createAccountSubmit = async (values: AccountCreatingFormValues) => {
    const data = {
      ...values,
      iconBackgroundColor,
      iconName: activeIconName,
      accountName: values.accountName.trim()
    }

    await createAccount(data)
    navigate("/accounts")
  }

  return (
    <div style={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Group mt={"md"} sx={{
        overflow: "auto",
        height: "90%",
        maxHeight: "70vh",
        padding: ".1rem"
      }}>
        <Box
          id={"createAccountForm"}
          component={"form"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "initial",
            alignItems: isMobile ? "center" : "initial",
            width: "100%",
            gap: "1rem"
          }}
          onSubmit={form.onSubmit(createAccountSubmit)}
        >
          <Box sx={{width: isMobile ? "100%" : "50%"}}>
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
              precision={2}
              rightSection={getSymbolFromCurrency(form.values.currency)}
              {...form.getInputProps("amount")}
            />
          </Box>
            <ColorPicker
              mt={"sm"}
              size={isMobile ? "xs" : "md"}
              swatchesPerRow={6}
              format="hex"
              value={iconBackgroundColor}
              onChange={setIconBackgroundColor}
              swatches={colorsForPicker}
            />
        </Box>
        <AccountIconList
          activeIconName={activeIconName}
          setActiveIconName={setActiveIconName}
          backgroundColor={iconBackgroundColor}
        />
      </Group>
      <Button form={"createAccountForm"} mt={"md"} fullWidth size={"md"} type="submit">Create</Button>
    </div>
  )
}

export default AccountCreateForm
