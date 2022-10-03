import {
  Box,
  Button,
  ColorPicker,
  LoadingOverlay,
  NumberInput, Stack,
  TextInput,
} from "@mantine/core";
import CurrencySelect from "./CurrencySelect";
import colorsForPicker from "../data/colorsForPicker.json";
import AccountIconList from "./AccountIconList";
import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {AccountIconName} from "../types/ui.type";
import {useForm} from "@mantine/form";
import AccountService from "../services/accountService";
import {useAppSelector} from "../hooks/storeHooks";

const AccountEditForm = () => {
  const {id: currentAccountId} = useParams()
  const currentAccount = useAppSelector(state => (
    state.accountSlice.accounts.find(account => account.id === currentAccountId)
  ))!
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>(currentAccount.iconBackgroundColor)
  const [activeIconName, setActiveIconName] = useState<AccountIconName>(currentAccount.iconName)
  const form = useForm(AccountService.getAccountCreatingFormConfig())

  return (
    <div style={{position: "relative"}}>
      <LoadingOverlay visible={false} overlayBlur={2}/>
      <Box sx={{
        overflow: "auto",
        height: 450,
        position: "relative",
        padding: ".1rem"
      }}>
        <form>
          <TextInput
            mb={"sm"}
            label="Name"
            placeholder="My credit card"
          />
          <CurrencySelect label={"Currency"} form={form}/>
          <NumberInput
            mt={"sm"}
            placeholder="1251"
            label="Amount"
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
            <Button fullWidth size={"md"} type="submit">Save</Button>
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
    </div>
  )
}

export default AccountEditForm
