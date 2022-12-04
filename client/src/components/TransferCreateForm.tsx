import {ActionIcon, Box, Button, Group, LoadingOverlay, NumberInput} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/storeHooks";
import {useState} from "react";
import AccountSelect from "./AccountSelect";
import AccountService from "../services/accountService";
import {useForm} from "@mantine/form";
import TransferService from "../services/transferService";
import {useCreateTransferMutation} from "../api/transferApi";
import {useLazyGetAccountsQuery} from "../api/accountApi";
import {TransferCreatingFormValues} from "../types/sliceTypes/transfer.type";
import {IconArrowsExchange} from "@tabler/icons";

const TransferCreateForm = () => {
  const navigate = useNavigate()
  const accounts = useAppSelector(state => state.accountSlice.accounts)
  const [transferFromId, setTransferFromId] = useState<string | null>(null)
  const [transferToId, setTransferToId] = useState<string | null>(null)
  const form = useForm<TransferCreatingFormValues>(TransferService.getTransferCreatingFormConfig())
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

  const submit = async (values: TransferCreatingFormValues) => {
    await createTransfer(values)
    navigate("/accounts")

    await getAccounts()
  }

  const swap = () => {
    const oldTransferFromId = transferFromId
    setTransferFromId(transferToId)
    setTransferToId(oldTransferFromId)
  }

  return (
    <div style={{position: "relative"}}>
      <LoadingOverlay visible={isLoading} overlayBlur={2}/>
      <Box mt={"md"} sx={{
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
          <Group position={"center"}>
            <ActionIcon onClick={swap} color="teal" size="lg" radius="xl" variant="light">
              <IconArrowsExchange size={26}/>
            </ActionIcon>
          </Group>
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
            precision={2}
            {...form.getInputProps("amount")}
          />
          <Button mt={"md"} fullWidth size={"md"} type="submit">Create</Button>
        </form>
      </Box>
    </div>
  )
}

export default TransferCreateForm
