"use client";
import axios from "axios";
import styles from "./addTimeTable.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import AlertToast from "./AlertToast.js";
import { showAlert } from "../redux/alertSlice.js";
import { CloudUpload } from "@mui/icons-material";
import Progress from "./Progress.js";
const AddTimeTable = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const [standard, setStandard] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    if (!title || !standard || !file) {
      dispatch(
        showAlert({
          value: true,
          severity: "error",
          type: "normal_alert",
          msg: "all the field are required",
        })
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("standard", standard);
    formData.append("file", file);

    const response = await axios.post(`${base_url}/add-time-table`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const fileSize = progressEvent.total;
        const maxSize = 2000000 * 100;

        if (fileSize > maxSize || !file.type.startsWith("application")) {
          return setUploadProgress(null);
        }

        const percentCompleted = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(percentCompleted);
      },
    });

    const data = response.data;

    if (response.status === 400 || !data) {
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

      setTitle("");
      setStandard("");
      setUploadProgress(null);
      setFile(null);
      fileRef.current.value = null;
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>add time table</h1>
            <div className={styles.form_group}>
              <label htmlFor="title">title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="title">standard</label>
              <input
                type="text"
                name="standard"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="fileInput">
                <div className={styles.file_upload_container}>
                  <span className={styles.file_icon_container}>
                    <CloudUpload className={styles.file_icon} />
                  </span>
                  <span>{file ? file.name : "upload file"}</span>
                </div>
              </label>

              <input
                type="file"
                name="file"
                id="fileInput"
                className={styles.file_input}
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileRef}
              />
            </div>
            <div className={styles.btn_container}>
              <button onClick={handleSubmit}>
                {uploadProgress ? (
                  <Progress
                    caption={"Uploading..."}
                    size={21}
                    thickness={4.5}
                    color="white"
                  />
                ) : (
                  "add"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTimeTable;
