"use client";
import styles from "./login.module.css";
import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import AlertToast from "../../components/AlertToast.js";

import { showAlert} from "../../redux/alertSlice.js";

import {
  MailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import Link from "next/link";
const Loginpage = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [loginValue, setloginValue] = useState({
    email: "",
    password: "",
  });

  const visiblePasswordField = () => {
    setShowPassword(!showPassword);
    inputRef.current.focus();
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setloginValue((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const { email, password } = loginValue;
    if (email && password) {
      const response = await fetch(`${base_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status !== 200 || !data) {
        dispatch(
          showAlert({
            value: true,
            severity: "error",
            type: "normal_alert",
            msg: data.msg,
          })
        );
      } else if (data.user.is_admin === true) {
        router.push("/dashboard", { scroll: false });
        dispatch(
          showAlert({
            value: true,
            severity: "success",
            type: "login_success",
            msg: data.msg,
          })
        );
        setloginValue({
          email: "",
          password: "",
        });
      } else {
        router.push("/", { scroll: false });
        dispatch(
          showAlert({
            value: true,
            severity: "success",
            type: "login_success",
            msg: data.msg,
          })
        );
        setloginValue({
          email: "",
          password: "",
        });
      }
    } else {
      dispatch(
        showAlert({
          value: true,
          severity: "error",
          type: "normal_alert",
          msg: "All the fields are required",
        })
      );
    }
  };

  useEffect(() => {
    document.title = "Login";
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
              <h1 className={styles.heading}>Login</h1>
              <div className={styles.form_group}>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  value={loginValue.email}
                  onChange={getValue}
                />
                <MailOutlined className={styles.input_icon} />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="password">password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  ref={inputRef}
                  value={loginValue.password}
                  onChange={getValue}
                />
                <Link
                  href="/forget-password"
                  className={styles.forget_pass_link}
                >
                  forget password?
                </Link>
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
              <div className={styles.btn_container}>
                <button type="submit">Login</button>
              </div>
              <div className={styles.link_container}>
                <p>
                  Dont have an account? <Link href="/signup">signup</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
