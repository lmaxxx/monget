import {useNavigate, useParams} from "react-router-dom";
import {
  useDeleteTransactionMutation,
  useEditTransactionMutation,
  useGetTransactionQuery
} from "../api/transactionApi";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {TransactionCreatingFormValues, TransactionType} from "../types/sliceTypes/transaction.type";
import TransactionService from "../services/transactionService";
import {useMediaQuery} from "@mantine/hooks";
import {Box, Button, Group, LoadingOverlay, NumberInput, Textarea, TextInput, Text} from "@mantine/core";
import CurrencySelect from "./CurrencySelect";
import getSymbolFromCurrency from "currency-symbol-map";
import TransactionTypeSegmentControl from "./TransactionTypeSegmentControl";
import CategoryIcon from "./CategoryIcon";
import {DatePicker} from "@mantine/dates";
import {IconCalendar} from "@tabler/icons";
import {ICategory} from "../types/sliceTypes/category.type";
import HiddenTextStyles from "../assets/hiddenTextStyles";
import {useLazyGetAccountsQuery} from "../api/accountApi";

const TransactionEditForm = () => {
  const {id: transactionId} = useParams()
  const {data: currentTransaction, isLoading: isGettingTransaction, isError} = useGetTransactionQuery(
    transactionId!,
    {refetchOnMountOrArgChange: true})
  const [editTransaction, {isLoading: isEditingTransaction}] = useEditTransactionMutation()
  const [deleteTransaction, {isLoading: isDeletingTransaction}] = useDeleteTransactionMutation()
  const [getAccounts, {isLoading: isGettingAccounts}] = useLazyGetAccountsQuery()
  const navigate = useNavigate()
  const form = useForm<TransactionCreatingFormValues>(TransactionService.getTransactionFormConfig())
  const isMobile = useMediaQuery('(max-width: 600px)')
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.Expenses)
  const [category, setCategory] = useState<ICategory>({} as ICategory)
  const isLoading = isEditingTransaction || isGettingTransaction || isGettingAccounts
    || isDeletingTransaction || !Object.values(category).length

  useEffect(() => {
    if (isError) navigate("/")
    if(currentTransaction) {
      TransactionService.setDefaultEditForm(form, currentTransaction)
      setTransactionType(currentTransaction.transactionType)
      setCategory(currentTransaction.categoryId as ICategory)
    }
  }, [currentTransaction]);


  const editTransactionSubmit = async (values: TransactionCreatingFormValues) => {
    if(currentTransaction) {
      const data = {
        ...currentTransaction,
        ...values,
        categoryId: category.id,
      }

      await editTransaction(data)
      await getAccounts()
      navigate("/")
    }
  }

  const deleteTransactionSubmit = async () => {
    await deleteTransaction(transactionId!)
    await getAccounts()
    navigate("/")
  }

  return (
    <div style={{position: "relative", minHeight: "300px"}}>
      {
        isLoading ?
          <LoadingOverlay visible={true} overlayBlur={2}/>
          :
          <>
            <Group mt={"md"} sx={{
              overflow: "auto",
              height: "90%",
              maxHeight: "70vh",
              position: "relative",
              padding: ".1rem"
            }}>
              <Box
                id={"categoryEditForm"}
                component={"form"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: isMobile ? "column" : "initial",
                  alignItems: isMobile ? "center" : "initial",
                  width: "100%",
                  gap: "1rem 2rem"
                }}
                onSubmit={form.onSubmit(editTransactionSubmit)}
              >
                <Box sx={{width: isMobile ? "100%" : "50%"}}>
                  <TextInput
                    mb={"sm"}
                    label="Title"
                    placeholder="Bought a new book"
                    {...form.getInputProps("title")}
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
                <Box sx={{width: isMobile ? "100%" : "50%"}}>
                  <Textarea
                    label="Description"
                    description={"Not required"}
                    placeholder={"Nice description..."}
                    maxRows={2}
                    mb={"sm"}
                    {...form.getInputProps("description")}
                  />
                  <TransactionTypeSegmentControl
                    position={isMobile ? "center" : "left"}
                    transactionType={transactionType}
                    onChange={setTransactionType}
                    disabled
                  />
                  <Group mt={"sm"} position={isMobile ? "center" : "left"}>
                    <CategoryIcon
                      backgroundColor={category.iconBackgroundColor}
                      iconName={category.iconName}
                      backgroundSize={"3rem"}
                      iconSize={"32px"}
                    />
                    <Text sx={{...HiddenTextStyles}}>{category.name}</Text>
                  </Group>
                </Box>
              </Box>
            </Group>
            <DatePicker
              icon={<IconCalendar size={16} />}
              mt={"sm"}
              dropdownType="modal"
              clearable={false}
              placeholder="Pick date"
              {...form.getInputProps("date")}
            />
            <Button form={"categoryEditForm"} fullWidth mt={"md"} size={"md"} type="submit">Save</Button>
            <Button
              onClick={deleteTransactionSubmit}
              size={"md"}
              mt={"md"}
              fullWidth
              color={"red"}
              variant={"outline"}
            >Delete</Button>
          </>
      }
    </div>
  )
}

export default TransactionEditForm
