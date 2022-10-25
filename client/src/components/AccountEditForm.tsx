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
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import AccountService from "../services/accountService";
import {
  useDeleteAccountMutation,
  useEditAccountMutation,
  useGetAccountQuery
} from "../api/accountApi";
import {AccountIconType} from "../data/accountIcons";
import {IAccount} from "../types/sliceTypes/account.type";
import {useAppSelector} from "../hooks/storeHooks";

const AccountEditForm = () => {
  const {id} = useParams()
  const [editAccount, {isLoading: isEditing}] = useEditAccountMutation()
  const [deleteAccount, {isLoading: isDeleting}] = useDeleteAccountMutation()
  const {data: currentAccount, isLoading: isLoadingQuery, isError} = useGetAccountQuery(id!, {refetchOnMountOrArgChange: true})
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>(currentAccount?.iconBackgroundColor || "#ccc")
  const [activeIconName, setActiveIconName] = useState<AccountIconType>(currentAccount?.iconName || "IconCash")
  const accountsAmount = useAppSelector(state => state.accountSlice.accounts.length)
  const navigate = useNavigate()
  const form = useForm(AccountService.getAccountEditingFormConfig())
  const isLoading = isEditing || isDeleting || isLoadingQuery

  useEffect(() => {
    if(isError) navigate("/accounts")

    if(currentAccount) {
      AccountService.setDefaultEditForm(form, currentAccount)
      setIconBackgroundColor(currentAccount.iconBackgroundColor)
    }
  }, [currentAccount]);

  const editAccountSubmit = async (values: {[key: number]: string}) => {
    const data = {
      ...values,
      iconBackgroundColor,
      iconName: activeIconName,
      id
    } as IAccount

    await editAccount(data)
    navigate("/accounts")
  }

  const deleteAccountSubmit = async () => {
    await deleteAccount(id!)
    navigate("/accounts")
  }

  if(!currentAccount) return (
    <div style={{position: "relative", height: "400px"}}>
      <LoadingOverlay visible={true} overlayBlur={2}/>
    </div>
  )

  return (
    <div style={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Box sx={{
        overflow: "auto",
        height: 450,
        position: "relative",
        padding: ".1rem"
      }}>
        <form onSubmit={form.onSubmit(editAccountSubmit)}>
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
            <Button fullWidth size={"md"} type="submit">Save</Button>
            {
              accountsAmount > 1
              &&
              <Button
                onClick={deleteAccountSubmit}
                size={"md"}
                fullWidth
                component={Link}
                to={"/accounts"}
                color={"red"}
                variant={"outline"}
              >Delete</Button>
            }
          </Stack>
        </form>
      </Box>
    </div>
  )
}

export default AccountEditForm
