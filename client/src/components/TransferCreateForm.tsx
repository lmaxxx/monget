import {Box, Button, LoadingOverlay, NumberInput, Stack} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {useState} from "react";
import AccountSelect from "./AccountSelect";
import AccountService from "../services/accountService";
import {useForm} from "@mantine/form";
import TransferService from "../services/transferService";
import {useCreateTransferMutation} from "../api/transferApi";
import {useLazyGetAccountsQuery} from "../api/accountApi";
import {TransferCreatingFormValues} from "../types/form.type";

const TransferCreateForm = () => {
  const navigate = useNavigate()
  const accounts = useAppSelector(state => state.accountSlice.accounts)
  const [transferFromId, setTransferFromId] = useState<string | null>(null)
  const [transferToId, setTransferToId] = useState<string | null>(null)
  const form = useForm(TransferService.getTransferCreatingFormConfig())
  const fromInputProps = form.getInputProps("from")
  const toInputProps = form.getInputProps("to")
  const [createTransfer, {isLoading}] = useCreateTransferMutation()
  const [getAccounts] = useLazyGetAccountsQuery()

  const onFromAccountChange = (value: string) => {
    fromInputProps.onChange(value)
    setTransferFromId(value)
  }

  const onToAccountChange = (value: string) => {
    toInputProps.onChange(value)
    setTransferToId(value)
  }

  const submit = async (values: any) => {
    await createTransfer(values as TransferCreatingFormValues)
    navigate("/accounts")

    await getAccounts()
  }

  return (
    <div style={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Box sx={{
        overflow: "auto",
        position: "relative",
        padding: ".1rem"
      }}>
        <form onSubmit={form.onSubmit(submit)} style={{overflowX: "hidden"}}>
          <AccountSelect
            width={"78%"}
            data={AccountService.getAccountSelectItems(accounts, {disabled: [transferToId]})}
            activeAccountId={transferFromId}
            setActiveAccountId={onFromAccountChange}
            label={"Transfer from account"}
            {...fromInputProps}
          />
          <AccountSelect
            width={"78%"}
            data={AccountService.getAccountSelectItems(accounts, {disabled: [transferFromId]})}
            activeAccountId={transferToId}
            setActiveAccountId={onToAccountChange}
            label={"Transfer to account"}
            mt={"sm"}
            {...toInputProps}
          />
          <NumberInput
            mt={"sm"}
            placeholder="1251"
            label="Amount"
            {...form.getInputProps("amount")}
          />
          <Stack mt={"md"} align={"center"}>
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
    </div>
  )
}

export default TransferCreateForm