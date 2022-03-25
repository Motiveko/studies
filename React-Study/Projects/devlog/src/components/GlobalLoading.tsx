import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useCommon } from "../context/CommonContext";

function GlobalLoading() {
  const { globalLoading } = useCommon();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={globalLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
export default React.memo(GlobalLoading);
