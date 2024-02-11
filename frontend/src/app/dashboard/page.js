"use client";
import styles from "./dashboard.module.css";

import React, { useState, useEffect } from "react";
import TabNavigation from "../../components/Tab.js";
import Link from "next/link";
import AlertToast from "../../components/AlertToast.js";

import AllUserQueries from "../../components/AllUserQueries.js";
import AddTimeTable from "../../components/AddTimeTable.js";

import AddNotice from "../../components/AddNotice.js";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState(0);
  const tabs = [
    "User Query",
    "Add Time Table",
    "Add notice",
    "Manage Time Tables",
    "Manage Notice",
  ];

  return (
    <>
      <div className={styles.page_name_bar}>
        <h1 className={styles.page_title}>dashboard</h1>
      </div>
      <TabNavigation tabs={tabs} value={value} setValue={setValue} />
      <AlertToast />
      {value === 0 && <AllUserQueries />}
      {value === 1 && <AddTimeTable />}
      {value === 2 && <AddNotice />}
    </>
  );
};

export default Dashboard;
