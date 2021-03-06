import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type props = {
  message: string;
  type: "success" | "info" | "warning" | "error";
  open?: boolean;
  onClose?: () => void | undefined;
};
function AlertSnackbar({
  open = true, type, message, onClose,
}: props) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

// eslint-disable-next-line prefer-arrow-callback
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />; });
AlertSnackbar.defaultProps = {
  open: true,
  onClose: undefined,
};
export default React.memo(AlertSnackbar);
