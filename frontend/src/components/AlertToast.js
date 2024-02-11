"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../redux/alertSlice.js";

import Alert from "@mui/material/Alert";

const AlertToast = () => {
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const showAlert = useSelector((state) => state.alert.alertToast);

  const handleClose = () => {
    dispatch(clearAlert());
  };

  useEffect(() => {
    if (showAlert.type == "normal_alert") {
      setShowToast(true);
    }

    if (showAlert.type == "login_success" && pathname != "/login") {
      setShowToast(true);
    }

    if (showAlert.type == "password_reset_success" && pathname == "/login") {
      setShowToast(true);
    }

    const timeOut = setTimeout(handleClose, 3500);
    return () => {
      clearTimeout(timeOut);
      setShowToast(false);
    };
  }, [pathname, showAlert.value]);

  return (
    <>
      {showAlert.value && showToast === true ? (
        <Alert
          severity={showAlert.severity}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            zIndex: "500",
            textTransform: "capitalize",
            width: "100%",
          }}
        >
          {showAlert.msg}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default AlertToast;
