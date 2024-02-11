"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./contact.module.css";
import { RoomOutlined, CallOutlined, EmailOutlined } from "@mui/icons-material";
import AlertToast from "../../components/AlertToast.js";
import { showAlert } from "../../redux/alertSlice.js";
const Contactpage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobileno: "",
    message: "",
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    setValue((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const { name, email, mobileno, message } = value;

    if (!name || !email || !mobileno) {
      dispatch(
        showAlert({
          value: true,
          severity: "error",
          type: "normal_alert",
          msg: "all the field are required.",
        })
      );
      return;
    }

    const response = await fetch(`${base_url}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobileno, message }),
    });
    const data = await response.json();

    if (response.status !== 500) {
      dispatch(
        showAlert({
          value: true,
          severity: "success",
          type: "normal_alert",
          msg: data.msg,
        })
      );

      setValue({
        name: "",
        email: "",
        mobileno: "",
        message: "",
      });
    } else {
      dispatch(
        showAlert({
          value: true,
          severity: "error",
          type: "normal_alert",
          msg: data.msg,
        })
      );
    }
  };

  useEffect(() => {
    document.title = "Contact us";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className={styles.page_name_bar}>
        <h1 className={styles.page_title}>contact us</h1>
      </div>
      <div className={styles.contact_details_wrapper}>
        <div className={styles.contact_details_container}>
          <div className={styles.contact_details}>
            <span className={styles.icon_container}>
              <RoomOutlined className={styles.icon} />
            </span>
            <h2>Adarsh Academy</h2>
            <h3>Adarsh Academy,Kota,Sogaria.</h3>
          </div>

          <div className={styles.contact_details}>
            <span className={styles.icon_container}>
              <CallOutlined className={styles.icon} />
            </span>
            <h2>Phone</h2>
            <h3>Call us:- +91-141-2784045</h3>
          </div>

          <div className={styles.contact_details}>
            <span className={styles.icon_container}>
              <EmailOutlined className={styles.icon} />
            </span>
            <h2>Mail</h2>
            <h3>adarshacademy@gmail.com</h3>
          </div>
        </div>

        <div className={styles.contact_form_container}>
          <h1>drop us a quick message</h1>

          <div className={styles.alert_container}>
            <AlertToast />
          </div>

          <div className={styles.contact_form}>
            <div className={styles.inputs_container}>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={value.name}
                onChange={getValue}
              />

              <input
                type="text"
                name="email"
                placeholder="Email *"
                value={value.email}
                onChange={getValue}
              />
              <input
                type="tel"
                name="mobileno"
                placeholder="Mobile *"
                value={value.mobileno}
                onChange={getValue}
                minLength="10"
                maxLength="10"
              />
            </div>

            <div className={styles.textarea_container}>
              <textarea
                name="message"
                rows="8"
                cols="40"
                placeholder="Message"
                value={value.message}
                onChange={getValue}
              />
            </div>
          </div>
          <div className={styles.btn_container}>
            <button onClick={handleSubmit}>submit</button>
          </div>
        </div>
      </div>
      <div className={styles.google_map_container}>
        <iframe
          src="https://maps.google.com/maps?q=Sogaria%20kota%20rajasthan&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          frameBorder="0"
          scrolling="no"
          className={styles.map}
        ></iframe>
      </div>
    </>
  );
};

export default Contactpage;
