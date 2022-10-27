import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppSelector} from "../hooks/storeHooks";
import {useForm} from "@mantine/form";
import {useMediaQuery} from "@mantine/hooks";
import {Box, Button, ColorPicker, Group, LoadingOverlay, TextInput} from "@mantine/core";
import colorsForPicker from "../data/colorsForPicker.json";
import {useDeleteCategoryMutation, useEditCategoryMutation, useGetCategoryQuery} from "../api/categoryApi";
import {ICategory} from "../types/sliceTypes/category.type";
import CategoryService from "../services/categoryService";
import {TransactionIconType} from "../data/transactionIcons";
import CategoryIcon from "./CategoryIcon";
import ChooseCategoryIconModal from "./ChooseCategoryIconModal";

const CategoryEditForm = () => {
  const {id} = useParams()
  const [editCategory, {isLoading: isEditing}] = useEditCategoryMutation()
  const [deleteCategory, {isLoading: isDeleting}] = useDeleteCategoryMutation()
  const {
    data: currentCategory,
    isLoading: isLoadingQuery,
    isError
  } = useGetCategoryQuery(id!, {refetchOnMountOrArgChange: true})
  const [iconBackgroundColor, setIconBackgroundColor] = useState<string>(currentCategory?.iconBackgroundColor || "#ccc")
  const [activeIconName, setActiveIconName] = useState<TransactionIconType>(currentCategory?.iconName || "IconCash")
  const [openedModal, setOpenedModal] = useState<boolean>(false)
  const categoriesAmount = useAppSelector(state => state.categorySlice[`${currentCategory?.transactionType || "expenses"}Categories`].length)
  const navigate = useNavigate()
  const form = useForm(CategoryService.getCategoryEditingConfig())
  const isLoading = isEditing || isDeleting || isLoadingQuery
  const isMobile = useMediaQuery('(max-width: 520px)');

  useEffect(() => {
    if (isError) navigate("/categories")

    if (currentCategory) {
      CategoryService.setDefaultEditForm(form, currentCategory)
      setIconBackgroundColor(currentCategory.iconBackgroundColor)
      setActiveIconName(currentCategory.iconName)
    }
  }, [currentCategory]);

  const editCategorySubmit = async (values: { [key: number]: string }) => {
    const data = {
      ...values,
      iconBackgroundColor,
      iconName: activeIconName,
      id
    } as ICategory

    await editCategory(data)
    navigate("/categories")
  }

  const deleteCategorySubmit = async () => {
    await deleteCategory(id!)
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
          id={"categoryEditForm"}
          component={"form"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "initial",
            alignItems: isMobile ? "center" : "initial",
            width: "100%",
            gap: "1rem"
          }}
          onSubmit={form.onSubmit(editCategorySubmit)}
        >
          <Box sx={{width: isMobile ? "100%" : "60%"}}>
            <TextInput
              mb={"sm"}
              label="Name"
              placeholder="My credit card"
              {...form.getInputProps("name")}
            />
            <TextInput
              mt={"sm"}
              disabled
              variant={"filled"}
              defaultValue={currentCategory?.transactionType}
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
      <Button form={"categoryEditForm"} fullWidth mt={"md"} size={"md"} type="submit">Save</Button>
      {
        categoriesAmount > 1
        &&
        <Button
          onClick={deleteCategorySubmit}
          size={"md"}
          mt={"md"}
          fullWidth
          component={Link}
          to={"/categories"}
          color={"red"}
          variant={"outline"}
        >Delete</Button>
      }
      <ChooseCategoryIconModal
        opened={openedModal}
        onClose={closeModal}
        setActiveIconName={setActiveIconName}
      />
    </div>
  )
}

export default CategoryEditForm
