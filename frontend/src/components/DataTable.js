"use client";
import styles from "./dataTable.module.css";
import * as React from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Save, Delete, Close } from "@mui/icons-material";
import Progress from "./Progress.js";
const DataTable = ({
  loading,
  queriesData,
  setShowModal,
  setModalOperation,
  setItemId,
  rowId,
  setRowId,
  editRowId,
  setEditRowId,
  originalData,
  setOriginalData,
  setEditedData,
  stopEditMode,
  setStopEditMode,
}) => {
  const apiRef = useGridApiRef();
  const columns = [
    { field: "id", headerName: "S.No", width: 60 },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      isRequired: true,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      isRequired: true,
      editable: true,
    },
    {
      field: "mobileno",
      headerName: "Mobile no",
      width: 130,
      type: "number",
      isRequired: true,
      editable: true,
      valueFormatter: (params) => {
        return params.value ? String(params.value).replace(/,/g, "") : "";
      },
      renderCell: (params) => <span>{params.value}</span>,
    },

    { field: "message", headerName: "Message", width: 160, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {params.row._id === editRowId ? (
            <span>
              <Save
                style={{
                  cursor: "pointer",
                  marginRight: "8px",
                  fontSize: "1.8rem",
                }}
                onClick={() => showEditModalAndGetData(params.row)}
              />

              <Close
                style={{ cursor: "pointer", fontSize: "1.8rem" }}
                onClick={() => handleEditStop(params.row._id)}
              />
            </span>
          ) : (
            <Delete
              style={{ cursor: "pointer", fontSize: "1.8rem" }}
              onClick={() => showDeleteModalAndGetId(params.row._id)}
            />
          )}
        </div>
      ),
    },
  ];

  const handleSelectionChange = (newSelection) => {
    setItemId(newSelection);
  };

  const showDeleteModalAndGetId = (id) => {
    apiRef.current.selectRow(id);
    setModalOperation("delete");
    setShowModal(true);
  };

  const showEditModalAndGetData = (data) => {
    setItemId(data._id);
    setModalOperation("edit");
    setShowModal(true);

    setEditedData(apiRef.current.getRowWithUpdatedValues(data._id));
  };

  const handleEditStart = (data) => {
    setEditRowId(data._id);
    setOriginalData(data);
  };

  const handleEditStop = (id) => {
    apiRef.current.stopRowEditMode({ id });
    setEditRowId(null);
    setRowId(null);
  };

  React.useEffect(() => {
    if (stopEditMode === true && editRowId !== null) {
      handleEditStop(editRowId);
      setStopEditMode(false);
    }
  }, [stopEditMode]);

  return (
    <div className={styles.data_table_wrapper}>
      {loading ? (
        <Progress size={50} thickness={4} color="primary" />
      ) : (
        <DataGrid
          rows={queriesData}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick={true}
          disableRowSelectionOnClick={true}
          editMode="row"
          onRowClick={(params) => setRowId(params.row._id)}
          isCellEditable={(params) => {
            return params.row._id === rowId;
          }}
          onRowEditStart={(params) => handleEditStart(params.row)}
          onRowEditStop={(params) => handleEditStop(params.row._id)}
          onRowSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection)
          }
          apiRef={apiRef}
          style={{ fontSize: "1.5rem" }}
        />
      )}
    </div>
  );
};

export default DataTable;
