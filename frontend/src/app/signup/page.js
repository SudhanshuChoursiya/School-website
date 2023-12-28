"use client";
import styles from "./signup.module.css";
import { useState, useRef } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

  const visiblePasswordField = () => {
    setShowPassword(!showPassword);
    inputRef.current.focus();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.img_container}>
            <img src="/home_school_bg.jpg" alt="img" />
          </div>

          <div className={styles.form_container}>
            <form className={styles.form}>
              <h1 className={styles.heading}>Signup</h1>
              <div className={styles.form_group}>
                <label for="name">name</label>
                <input type="text" name="name" />
                <PersonOutlineOutlined className={styles.input_icon} />
              </div>
              <div className={styles.form_group}>
                <label for="email">email</label>
                <input type="email" name="email" />
                <MailOutlined  className={styles.input_icon} />
              </div>

              <div className={styles.form_group}>
                <label for="password">password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  ref={inputRef}
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
                  />
                  <label htmlFor="student">student</label>
                </div>
                <div className={styles.radio_group}>
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    id="teacher"
                  />
                  <label htmlFor="teacher">teacher</label>
                </div>
              </div>
              <div className={styles.btn_container}>
                <button type="submit">Sign up</button>
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
