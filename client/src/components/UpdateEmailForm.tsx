import {Box, Button, TextInput} from "@mantine/core"
import {useForm} from "@mantine/form";
import {useAppSelector} from "../hooks/storeHooks";
import {UpdateEmailFromValues} from "../types/sliceTypes/user.type";
import AuthService from "../services/authService";
import {useUpdateEmailMutation} from "../api/authApi";
import {useEffect} from "react";
import NotificationService from "../services/notificationService";
import {ApiError} from "../types/ui.type";

const UpdateEmailForm = () => {
  const activeUserEmail = useAppSelector(state => state.userSlice.user.email)
  const form = useForm<UpdateEmailFromValues>(AuthService.getUpdatingEmailFormConfig(activeUserEmail))
  const [updateEmail, {error}] = useUpdateEmailMutation()

  const updateEmailSubmit = async (values: UpdateEmailFromValues) => {
    await updateEmail(values)
  }

  useEffect(() => {
    if(error) NotificationService.sendErrorNotification(error as ApiError)
  }, [error]);

  return (
    <Box
      mt={"lg"}
      component={"form"}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
      }}
      onSubmit={form.onSubmit(updateEmailSubmit)}
    >
      <TextInput
        placeholder="New email"
        {...form.getInputProps("email")}
      />
      <Button
        mt={"sm"}
        fullWidth
        type={"submit"}
        color={"green"}
      >Update</Button>
    </Box>
  )
}

export default UpdateEmailForm
