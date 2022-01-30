import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AdjustIcon from "@mui/icons-material/Adjust";
import Login from "../modules/auth/Login";
import Signup from "../modules/auth/Signup";
import { clearAuthError } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const tabStyle = {
  width: "50%",
  zIndex: 0,
  overflow: "hidden",
  color: "black",
  textTransform: "none",
  fontWeight: "bold",
  borderTopRightRadius: "5px",
  backgroundColor: "lightgrey",
};
const tabActiveStyle = {
  width: "50%",
  zIndex: 0,
  overflow: "hidden",
  color: "black",
  fontWeight: "bold",
  borderTopLeftRadius: "5px",
  backgroundColor: "white",
  textTransform: "none",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Tabsi() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(clearAuthError());
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: "5px",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ style: { backgroundColor: "white" } }}
        //  style={{inlineBlock: 'center'}}
      >
        <Tab label="Loag In" style={value ? tabStyle : tabActiveStyle} />
        <Tab label="Create Account" style={value ? tabActiveStyle : tabStyle} />
      </Tabs>
      <AdjustIcon
        style={{
          position: "absolute",
          left: "48%",
          zIndex: 555,
          top: 30,
        }}
      />
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Box>
  );
}
