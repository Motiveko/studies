import { Alert } from "react-bootstrap";

export default function AlertBanner({
  message = "An unexpected error occureed. Please try again later",
  variant = "danger",
}) {
  return (
    <Alert
      variant={variant}
      style={{ backgroundColor: "red" }}
      aria-label="An unexpected error occureed. Please try again later"
    >
      {message}
    </Alert>
  );
}
