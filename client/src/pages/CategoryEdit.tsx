import {Center, Paper, useMantineTheme} from "@mantine/core";
import FormHeader from "../components/FormHeader";
import CategoryEditForm from "../components/CategoryEditForm";

const CategoryEdit = () => {
  const theme = useMantineTheme()

  return (
    <Center style={{
      height: "100vh",
      width: "100%",
      backgroundColor: theme.colors.gray[1]
    }}>
      <Paper sx={{maxWidth: 600, width: "90%"}} shadow="xl" radius="md" p="xl">
        <FormHeader title={"Category settings"} goBackPath={"/categories"}/>
        <CategoryEditForm/>
      </Paper>
    </Center>
  )
}

export default CategoryEdit
