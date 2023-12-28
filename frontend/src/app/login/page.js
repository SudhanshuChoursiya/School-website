"use client";
import styles from "./login.module.css";
import { useState, useRef } from "react";
import {
  MailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import Link from "next/link";
const Loginpage = () => {
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
            <h1 className={styles.heading}>Login</h1>
              <div className={styles.form_group}>
                <label htmlFor="email">email</label>
                <input type="email" name="email" />
                <MailOutlined className={styles.input_icon} />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="password">password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  ref={inputRef}
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
