"use client";
import { Tabs, Tab, Paper, useMediaQuery } from "@mui/material";
const TabNavigation = ({ tabs, value, setValue }) => {
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={!isDesktop ? "scrollable" : "standard"}
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        centered={!isDesktop ? false : true}
      >
        {tabs.map((tab, index) => (
          <Tab label={tab} sx={{ fontSize: "1.44rem" }} key={index} />
        ))}
      </Tabs>
    </Paper>
  );
};

export default TabNavigation;
