import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

// ✅ Success notification
const successNotification = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    icon: <IconCheck style={{ width: 20, height: 20 }} />,
    color: "teal",
    withBorder: true,
    withCloseButton: true,
    className: "!border-green-500",
  });
};

// ✅ Error notification
const errorNotification = (title: string, err_response: any) => {
  // Extract message safely (handle string or object)
  const errorMsg =
    typeof err_response === "string"
      ? err_response
      : err_response?.response?.data?.errorMessage ||
        err_response?.message ||
        "Something went wrong";

  notifications.show({
    title,
    message: errorMsg,
    icon: <IconX style={{ width: 20, height: 20 }} />,
    color: "red",
    withBorder: true,
    withCloseButton: true,
    className: "!border-red-500",
  });
};

export { successNotification, errorNotification };
