import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modala from "./Modal";
import Tabsi from "./Tabs";
import {
  selectForgotPass,
  selectIsAuth,
  setAuth,
  setLogout,
} from "../features/auth/authSlice";
import { Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getToken, removeToken } from "../app/localstorage";
import ForgotPassword from "../modules/auth/ForgotPassword";
import ResetForgotenPassword from "../modules/auth/ResetForgotenPassword";

export default function MenuAppBarr() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useSelector(selectIsAuth);
  const isForgotPass = useSelector(selectForgotPass);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeToken();
    dispatch(setLogout());
    handleClose();
  };

  React.useEffect(() => {
    const isAuth = getToken();
    if (isAuth) {
      dispatch(setAuth(true));
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon size="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={auth && handleMenu}
            >
              {auth ? (
                <AccountCircle style={{ height: "40px", width: "40px" }} />
              ) : (
                <Modala>
                  {!isForgotPass ? (
                    <Tabsi />
                  ) : isForgotPass === "resetCode" ? (
                    <ForgotPassword />
                  ) : (
                    <ResetForgotenPassword />
                  )}
                </Modala>
              )}
            </IconButton>
            {auth && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>logout</MenuItem>
              </Menu>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
