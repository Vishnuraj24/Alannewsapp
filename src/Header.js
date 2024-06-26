import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)({
  background: "#333",
});

function Header({ withLogoutButton = false, onLogout, emailname = "" }) {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ALAN AI NEWS
        </Typography>

        {emailname ? ( // Conditionally render welcome message with username
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {emailname}!
          </Typography>
        ) : (
          <Typography></Typography>
        )}
        {withLogoutButton && ( // Conditionally render logout button
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </CustomAppBar>
  );
}

export default Header;
