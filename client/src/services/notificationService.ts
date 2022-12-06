import {ApiError} from "../types/ui.type";
import {showNotification} from "@mantine/notifications";

class NotificationService {
  sendErrorNotification(error: ApiError) {
    showNotification({
      message: error.data.message,
      color: "red",
      autoClose: 3000
    })
  }

  sendScrrenWarning() {
    showNotification({
      message: "It is better to use fullscreen mode",
      color: "yellow",
      autoClose: 3000,
    })
  }
}

export default new NotificationService()
