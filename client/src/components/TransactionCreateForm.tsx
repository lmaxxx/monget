import {useGetAllCategoriesQuery} from "../api/categoryApi";
import {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useForm} from "@mantine/form";
import CategoryService from "../services/categoryService";
import {useMediaQuery} from "@mantine/hooks";
import {TransactionCreatingFormValues, TransactionType} from "../types/sliceTypes/transaction.type";
import {Box, Button, Group, LoadingOverlay, NumberInput, Textarea, TextInput} from "@mantine/core";
import TransactionTypeSegmentControl from "./TransactionTypeSegmentControl";
import CategoryIcon from "./CategoryIcon";
import {useCreateTransactionMutation} from "../api/transactionApi";
import TransactionService from "../services/transactionService";
import CurrencySelect from "./CurrencySelect";
import getSymbolFromCurrency from "currency-symbol-map";
import {useAppSelector} from "../hooks/storeHooks";
import {ICategory} from "../types/sliceTypes/category.type";
import ChooseCategoryModaL from "./ChooseCategoryModaL";
import {DatePicker} from '@mantine/dates'
import {IconCalendar} from "@tabler/icons";
import {useLazyGetAccountsQuery} from "../api/accountApi";

const TransactionCreateForm = () => {
  const location = useLocation()
  const {transactionType: defaultTransactionType, accountCurrency} = location.state
  const [createTransaction, {isLoading: isCreatingTransaction}] = useCreateTransactionMutation()
  const [getAccounts, {isLoading: isGettingAccounts}] = useLazyGetAccountsQuery()
  const {id: accountId} = useParams()
  const [openedModal, setOpenedModal] = useState<boolean>(false)
  const {isLoading: isGettingCategoriesLoading} = useGetAllCategoriesQuery()
  const navigate = useNavigate()
  const form = useForm<TransactionCreatingFormValues>(TransactionService.getTransactionFormConfig(accountCurrency))
  const isMobile = useMediaQuery('(max-width: 600px)')
  const [transactionType, setTransactionType] = useState<TransactionType>(defaultTransactionType)
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id)
  const activeCategory = useMemo<ICategory>(() => (
    CategoryService.getCategoryById(categories, activeCategoryId)!
  ), [activeCategoryId])
  const isLoading = isCreatingTransaction || isGettingCategoriesLoading || isGettingAccounts || !activeCategory

  useEffect(() => {
    setActiveCategoryId(categories[0]?.id)
  }, [transactionType]);

  const createTransactionSubmit = async (values: TransactionCreatingFormValues) => {
    const data = {
      ...values,
      transactionType,
      categoryId: activeCategoryId,
      accountId: accountId!,
      title: values.title.trim(),
      description: values.description?.trim()
    }

    await createTransaction(data)
    await getAccounts()
    navigate("/")
  }

  const openModal = () => setOpenedModal(true)
  const closeModal = () => setOpenedModal(false)

  if (isLoading) {
    return (
      <div style={{position: "relative", minHeight: "300px"}}>
        <LoadingOverlay visible={true} overlayBlur={2}/>
      </div>
    )
  }

  return (
    <div style={{position: "relative", minHeight: "300px"}}>
      <Group mt={"md"} sx={{
        overflow: "auto",
        height: "90%",
        maxHeight: "70vh",
        padding: ".1rem"
      }}>
        <Box
          id={"categoryTransferForm"}
          component={"form"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "initial",
            alignItems: isMobile ? "center" : "initial",
            width: "100%",
            gap: "1rem 2rem"
          }}
          onSubmit={form.onSubmit(createTransactionSubmit)}
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
            />
            <Group mt={"sm"} position={isMobile ? "center" : "left"}>
              <CategoryIcon
                backgroundColor={activeCategory.iconBackgroundColor}
                iconName={activeCategory.iconName}
                backgroundSize={"3rem"}
                iconSize={"32px"}
              />
              <Button onClick={openModal} color={"violet"} variant={"light"}>Choose cateogry</Button>
            </Group>
          </Box>
        </Box>
      </Group>
      <DatePicker
        icon={<IconCalendar size={16}/>}
        mt={"sm"}
        dropdownType="modal"
        clearable={false}
        placeholder="Pick date"
        {...form.getInputProps("date")}
      />
      <Button form={"categoryTransferForm"} fullWidth mt={"md"} size={"md"} type="submit">Create</Button>
      <ChooseCategoryModaL
        opened={openedModal}
        onClose={closeModal}
        setActiveCategoryId={setActiveCategoryId}
        transactionType={transactionType}
      />
    </div>
  )
}

export default TransactionCreateForm
