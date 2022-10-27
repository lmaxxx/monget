import {useNavigate, useParams} from "react-router-dom";
import {useCreateCategoryMutation} from "../api/categoryApi";
import {useState} from "react";
import {TransactionIconType} from "../data/transactionIcons";
import {useForm} from "@mantine/form";
import CategoryService from "../services/categoryService";
import {useMediaQuery} from "@mantine/hooks";
import {ICategory, TransactionType} from "../types/sliceTypes/category.type";
import {Box, Button, ColorPicker, Group, LoadingOverlay, TextInput} from "@mantine/core";
import CategoryIcon from "./CategoryIcon";
import colorsForPicker from "../data/colorsForPicker.json";
import ChooseCategoryIconModal from "./ChooseCategoryIconModal";
import CategorySegmentControl from "./CategorySegmentControl";

const CategoryCreateForm = () => {
  const [createCategory, {isLoading}] = useCreateCategoryMutation()
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>("#FFD339")
  const [activeIconName, setActiveIconName] = useState<TransactionIconType>("IconWorld")
  const [openedModal, setOpenedModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const form = useForm(CategoryService.getCategoryEditingConfig())
  const isMobile = useMediaQuery('(max-width: 520px)')
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.Expenses)

  const createCategorySubmit = async (values: { [key: number]: string }) => {
    const data = {
      ...values,
      iconBackgroundColor,
      iconName: activeIconName,
      transactionType
    } as ICategory

    await createCategory(data)
    navigate("/categories")
  }

  const openModal = () => setOpenedModal(true)
  const closeModal = () => setOpenedModal(false)

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
          id={"categoryCreateForm"}
          component={"form"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "initial",
            alignItems: isMobile ? "center" : "initial",
            width: "100%",
            gap: "1rem"
          }}
          onSubmit={form.onSubmit(createCategorySubmit)}
        >
          <Box sx={{width: isMobile ? "100%" : "60%"}}>
            <TextInput
              mb={"sm"}
              label="Name"
              placeholder="My credit card"
              {...form.getInputProps("name")}
            />
            <CategorySegmentControl
              position={isMobile ? "center" : "left"}
              transactionType={transactionType}
              onChange={setTransactionType}
            />
            <Group mt={"sm"} position={isMobile ? "center": "left"}>
              <CategoryIcon
                backgroundColor={iconBackgroundColor}
                iconName={activeIconName}
                backgroundSize={"3rem"}
                iconSize={"2rem"}
              />
              <Button onClick={openModal} color={"violet"} variant={"light"}>Choose icon</Button>
            </Group>
          </Box>
          <ColorPicker
            swatchesPerRow={6}
            size={isMobile ? "xs" : "sm"}
            format="hex"
            value={iconBackgroundColor}
            onChange={setIconBackgroundColor}
            swatches={colorsForPicker}
          />
        </Box>
      </Group>
      <Button form={"categoryCreateForm"} fullWidth mt={"md"} size={"md"} type="submit">Create</Button>
      <ChooseCategoryIconModal
        opened={openedModal}
        onClose={closeModal}
        setActiveIconName={setActiveIconName}
      />
    </div>
  )
}

export default CategoryCreateForm
