"use client";
import styles from "./signup.module.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import AlertToast from "../../components/AlertToast.js";
import { showAlert } from "../../redux/alertSlice.js";
import {
  MailOutlined,
  PersonOutlineOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import Link from "next/link";
const Signuppage = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const visiblePasswordField = () => {
    setShowPassword(!showPassword);
    inputRef.current.focus();
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setSignupData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const { name, email, password, role } = signupData;
    if (!name || !email || !password || !role) {
      dispatch(
        showAlert({
          value: true,
          severity: "error",
          type: "normal_alert",
          msg: "All fields are required !",
        })
      );
      return;
    }

    const response = await fetch(`${base_url}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
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
    } else {
      dispatch(
        showAlert({
          value: true,
          severity: "success",
          type: "normal_alert",
          msg: data.msg,
        })
      );
      setSignupData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
  };

  useEffect(() => {
    document.title = "Sign up";
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
            <form className={styles.form}>
              <h1 className={styles.heading}>Signup</h1>
              <div className={styles.form_group}>
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={getValue}
                />
                <PersonOutlineOutlined className={styles.input_icon} />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
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
                  value={signupData.password}
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
              <div className={styles.radio_btn_container}>
                Signup as :
                <div className={styles.radio_group}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    onChange={getValue}
                  />
                  <label htmlFor="student">student</label>
                </div>
                <div className={styles.radio_group}>
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    id="teacher"
                    onChange={getValue}
                  />
                  <label htmlFor="teacher">teacher</label>
                </div>
              </div>
              <div className={styles.btn_container}>
                <button onClick={handleSubmit}>Sign up</button>
              </div>
              <div className={styles.link_container}>
                <p>
                  Already have an account? <Link href="/login">login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signuppage;
