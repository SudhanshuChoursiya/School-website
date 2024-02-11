"use client";
import styles from "../reset-password.module.css";
import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import AlertToast from "../../../components/AlertToast.js";
import { showAlert} from "../../../redux/alertSlice.js";

import {
  MailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import Link from "next/link";
const ResetPasswordPage = ({ params }) => {
  const passwordRef = useRef();
  const cPasswordRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [input, setInput] = useState({
    password: "",
    cpassword: "",
  });

  const visiblePasswordField = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const visibleConfirmPasswordField = () => {
    setShowConfirmPassword(!showConfirmPassword);
    cPasswordRef.current.focus();
  };

  const getValue = (e) => {
    const { name, value } = e.target;

    setInput((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const token = params.authToken;

    const { password, cpassword } = input;
    if (password && cpassword) {
      const res = await fetch(`${base_url}/forget-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password, cpassword }),
      });
      const data = await res.json();
      if (res.status !== 200 || !data) {
        dispatch(
          showAlert({
            value: true,
            severity: "error",
            type: "normal_alert",
            msg: data.msg,
          })
        );
      } else {
        setInput({
          password: "",
          cpassword: "",
        });
        router.push("/login", { scroll: false });
        dispatch(
          showAlert({
            value: true,
            severity: "success",
            type: "password_reset_success",
            msg: data.msg,
          })
        );
      }
    } else {
      dispatch(
        showAlert({
          value: true,
          severity: "error",
          type: "normal_alert",
          msg: "Please fill all the fields !",
        })
      );
    }
  };

  useEffect(() => {
    document.title = "Reset Password";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.alert_container}>
            <AlertToast />
          </div>
          <div className={styles.img_container}>
            <img src="/home_school_bg.jpg" alt="img" />
          </div>

          <div className={styles.form_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.heading}>Reset password</h1>

              <div className={styles.form_group}>
                <label htmlFor="password">password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  ref={passwordRef}
                  value={input.password}
                  onChange={getValue}
                />

                <LockOutlined className={styles.input_icon} />

                {!showPassword ? (
                  <VisibilityOutlined
                    className={styles.show_hide_icon}
                    onClick={visiblePasswordField}
                    onMouseUp={(e) => e.preventDefault()}
                  />
                ) : (
                  <VisibilityOffOutlined
                    className={styles.show_hide_icon}
                    onClick={visiblePasswordField}
                    onMouseUp={(e) => e.preventDefault()}
                  />
                )}
              </div>
              <div className={styles.form_group}>
                <label htmlFor="cpassword">Confirm password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="cpassword"
                  ref={cPasswordRef}
                  value={input.cpassword}
                  onChange={getValue}
                />

                <LockOutlined className={styles.input_icon} />

                {!showConfirmPassword ? (
                  <VisibilityOutlined
                    className={styles.show_hide_icon}
                    onClick={visibleConfirmPasswordField}
                    onMouseUp={(e) => e.preventDefault()}
                  />
                ) : (
                  <VisibilityOffOutlined
                    className={styles.show_hide_icon}
                    onClick={visibleConfirmPasswordField}
                    onMouseUp={(e) => e.preventDefault()}
                  />
                )}
              </div>
              <div className={styles.btn_container}>
                <button type="submit">Confirm</button>
              </div>
              <div className={styles.link_container}>
                <p>
                  Dont want to reset? <Link href="/login">cancel</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
