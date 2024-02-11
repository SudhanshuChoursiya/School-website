"use client";
import styles from "./forget-password.module.css";
import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";

import AlertToast from "../../components/AlertToast.js";
import { showAlert } from "../../redux/alertSlice.js";

import { MailOutlined } from "@mui/icons-material";
import Link from "next/link";
const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    if (email) {
      const res = await fetch(`${base_url}/send-reset-password-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.status === 500 || !data) {
        dispatch(
          showAlert({
            value: true,
            severity: "error",
            type: "normal_alert",
            msg: data.msg,
          })
        );
      } else {
        setEmail("");
        dispatch(
          showAlert({
            value: true,
            severity: "success",
            type: "normal_alert",
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
          msg: "Please enter your email !",
        })
      );
    }
  };

  useEffect(() => {
    document.title = "Forget Password";
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
              <h1 className={styles.heading}>Get Reset passweord link</h1>
              <div className={styles.form_group}>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MailOutlined className={styles.input_icon} />
              </div>

              <div className={styles.btn_container}>
                <button type="submit">confirm</button>
              </div>
              <div className={styles.link_container}>
                <p>
                  Dont want to change password?{" "}
                  <Link href="/login">cancel</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
