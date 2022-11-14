import {useGetAllCategoriesQuery} from "../api/categoryApi";
import {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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

const CreateTransactionForm = () => {
  const [createTransaction, {isLoading: isCreatingTransaction}] = useCreateTransactionMutation()
  const {id: accountId} = useParams()
  const [openedModal, setOpenedModal] = useState<boolean>(false)
  const {isLoading: isGettingCategoriesLoading} = useGetAllCategoriesQuery()
  const navigate = useNavigate()
  const form = useForm(TransactionService.getCreateTransactionFormConfig())
  const isMobile = useMediaQuery('(max-width: 600px)')
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.Expenses)
  const categories = useAppSelector(state => state.categorySlice[`${transactionType}Categories`])
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id)
  const activeCategory = useMemo<ICategory>(() => (
    CategoryService.getCategoryById(categories, activeCategoryId)!
  ), [activeCategoryId])
  const isLoading = isCreatingTransaction || isGettingCategoriesLoading

  useEffect(() => {
    setActiveCategoryId(categories[0]?.id)
  }, [transactionType]);

  const createTransactionSubmit = async (values: { [key: number]: string }) => {
    const data = {
      ...values,
      transactionType,
      categoryId: activeCategoryId,
      accountId
    } as TransactionCreatingFormValues

    await createTransaction(data)
    navigate("/")
  }

  const openModal = () => setOpenedModal(true)
  const closeModal = () => setOpenedModal(false)

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
                      iconSize={"2rem"}
                    />
                    <Button onClick={openModal} color={"violet"} variant={"light"}>Choose cateogry</Button>
                  </Group>
                </Box>
              </Box>
            </Group>
            <Button form={"categoryTransferForm"} fullWidth mt={"md"} size={"md"} type="submit">Create</Button>
          </>
      }
      <ChooseCategoryModaL
        opened={openedModal}
        onClose={closeModal}
        setActiveCategoryId={setActiveCategoryId}
        transactionType={transactionType}
      />
    </div>
  )
}

export default CreateTransactionForm
