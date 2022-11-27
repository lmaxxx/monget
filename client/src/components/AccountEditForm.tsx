import {Box, Button, ColorPicker, Group, LoadingOverlay, NumberInput, TextInput} from "@mantine/core";
import CurrencySelect from "./CurrencySelect";
import colorsForPicker from "../data/colorsForPicker.json";
import AccountIconList from "./AccountIconList";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import AccountService from "../services/accountService";
import {useDeleteAccountMutation, useEditAccountMutation, useGetAccountQuery} from "../api/accountApi";
import {AccountIconType} from "../data/accountIcons";
import {AccountEditingFormValues, IAccount} from "../types/sliceTypes/account.type";
import {useAppSelector} from "../hooks/storeHooks";
import {useMediaQuery} from "@mantine/hooks";
import getSymbolFromCurrency from "currency-symbol-map";

const AccountEditForm = () => {
  const {id} = useParams()
  const [editAccount, {isLoading: isEditing}] = useEditAccountMutation()
  const [deleteAccount, {isLoading: isDeleting}] = useDeleteAccountMutation()
  const {
    data: currentAccount,
    isLoading: isLoadingQuery,
    isError
  } = useGetAccountQuery(id!, {refetchOnMountOrArgChange: true})
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>(currentAccount?.iconBackgroundColor || "#ccc")
  const [activeIconName, setActiveIconName] = useState<AccountIconType>(currentAccount?.iconName || "IconCash")
  const accountsAmount = useAppSelector(state => state.accountSlice.accounts.length)
  const navigate = useNavigate()
  const form = useForm<AccountEditingFormValues>(AccountService.getAccountEditingFormConfig())
  const isLoading = isEditing || isDeleting || isLoadingQuery
  const isMobile = useMediaQuery('(max-width: 520px)');

  useEffect(() => {
    if (isError) navigate("/accounts")

    if (currentAccount) {
      AccountService.setDefaultEditForm(form, currentAccount)
      setIconBackgroundColor(currentAccount.iconBackgroundColor)
      setActiveIconName(currentAccount.iconName)
    }
  }, [currentAccount]);

  const editAccountSubmit = async (values: AccountEditingFormValues) => {
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

  return (
    <div style={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Group mt={"md"} sx={{
        overflow: "auto",
        height: "90%",
        maxHeight: "70vh",
        position: "relative",
        padding: ".1rem"
      }}>
        <Box
          id={"accountEditForm"}
          component={"form"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "initial",
            alignItems: isMobile ? "center" : "initial",
            width: "100%",
            gap: "1rem"
          }}
          onSubmit={form.onSubmit(editAccountSubmit)}
        >
          <Box sx={{width: isMobile ? "100%" : "50%"}}>
            <TextInput
              mb={"sm"}
              label="Name"
              placeholder="My credit card"
              {...form.getInputProps("accountName")}
            />
            <CurrencySelect label={"Currency"} form={form} disabled/>
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
            swatchesPerRow={6}
            size={isMobile ? "xs" : "md"}
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
      <Button form={"accountEditForm"} fullWidth mt={"md"} size={"md"} type="submit">Save</Button>
      {
        accountsAmount > 1
        &&
        <Button
          onClick={deleteAccountSubmit}
          size={"md"}
          mt={"md"}
          fullWidth
          color={"red"}
          variant={"outline"}
        >Delete</Button>
      }
    </div>
  )
}

export default AccountEditForm
