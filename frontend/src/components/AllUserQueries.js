"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/alertSlice.js";
import DataTable from "./DataTable.js";
import PopupModal from "./PopupModal.js";
const AllUserQueries = () => {
  const dispatch = useDispatch();
  const [queriesData, setQueriesData] = useState([]);
  const [originalData, setOriginalData] = useState({});

  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalOperation, setModalOperation] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  const [stopEditMode, setStopEditMode] = useState(false);

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;

  const getQueryData = async () => {
    try {
      const response = await fetch(`${base_url}/get-all-userquery`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setQueriesData(
          data.allQueries.map((data, index) => {
            return { id: index + 1, ...data };
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      if (Object.keys(editedData).length === 0) {
        return dispatch(
          showAlert({
            value: true,
            severity: "error",
            type: "normal_alert",
            msg: "please do any changes",
          })
        );
      }
      setShowSpinner(true);
      const { name, email, mobileno, message } = editedData;
      const response = await fetch(`${base_url}/edit-user-query/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobileno, message }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(
          showAlert({
            value: true,
            severity: "success",
            type: "normal_alert",
            msg: data.msg,
          })
        );
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
    } catch (error) {
      console.log(error);
    } finally {
      setShowSpinner(false);
      setShowModal(false);
      setStopEditMode(true);
    }
  };

  const handleDelete = async () => {
    try {
      setShowSpinner(true);
      const response = await fetch(`${base_url}/delete-user-query`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryIds: itemId }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(
          showAlert({
            value: true,
            severity: "success",
            type: "normal_alert",
            msg: data.msg,
          })
        );
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
    } catch (error) {
      console.log(error);
    } finally {
      setShowSpinner(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    getQueryData();
  }, [queriesData]);

  return (
    <>
      <DataTable
        loading={loading}
        queriesData={queriesData}
        setShowModal={setShowModal}
        setModalOperation={setModalOperation}
        setItemId={setItemId}
        rowId={rowId}
        setRowId={setRowId}
        editRowId={editRowId}
        setEditRowId={setEditRowId}
        originalData={originalData}
        setOriginalData={setOriginalData}
        setEditedData={setEditedData}
        stopEditMode={stopEditMode}
        setStopEditMode={setStopEditMode}
      />
      {modalOperation === "delete" && (
        <PopupModal
          showModal={showModal}
          setShowModal={setShowModal}
          modal_title="Confirm"
          modal_desc="are u sure u want to delete ?"
          modal_action_type="button"
          handleOperation={handleDelete}
          showSpinner={showSpinner}
        />
      )}

      {modalOperation === "edit" && (
        <PopupModal
          showModal={showModal}
          setShowModal={setShowModal}
          modal_title="Confirm"
          modal_desc="are u sure u want to edit ?"
          modal_action_type="button"
          handleOperation={handleEdit}
          showSpinner={showSpinner}
        />
      )}
    </>
  );
};

export default AllUserQueries;
