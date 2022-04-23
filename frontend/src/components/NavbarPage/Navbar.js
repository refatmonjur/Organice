import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import "./Navbar.css";
import Logo from "./test_logo.png";
import { useUserAuth } from "../Context/UserAuthContext";
import { useHistory } from "react-router-dom";
import Flashcard from "../FlashcardsPage/Flashcard";

const useStyles = makeStyles({
  header: {
    backgroundColor: "blue",
    color: "black",
    boxShadow: "0px 0px 0px 0px",
  },
});

function Navbar() {
  // style hook here
  const classes = useStyles();

  const pages = ["Flashcards", "To-do List", "Calendar"];
  const settings = ["Account", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { logOut } = useUserAuth();

  const history = useHistory();
  const Logout = async () => {
    try {
      await logOut();
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppBar position="static" className="bg-dark">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <div>
            <img src={Logo} width={80} />
          </div> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src={Logo} width="100" height="80" />
          </Typography>
          {/* comment */}
          {/* When Browser is Smaller */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-controls="menu-appbar"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="Flashcards" onClick={handleCloseNavMenu}>
                <Link to="/flashcard" className="menuOptions">
                  Flashcard
                </Link>
              </MenuItem>
              <MenuItem key="To-do List" onClick={handleCloseNavMenu}>
                <Link to="/newTodo" className="menuOptions">
                  To-do List
                </Link>
              </MenuItem>
              <MenuItem key="Calendar" onClick={handleCloseNavMenu}>
                <Link to="/calendar" className="menuOptions">
                  Calendar
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          {/* When Browser is Maximized */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Organice
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="Flashcards"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              path="/flashcard"
            >
              <Link to="/flashcard" className="nabBarOptions">
                Flashcard
              </Link>
            </Button>
            <Button
              key="To-do List"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              path="/signup"
            >
              <Link to="/newTodo" className="nabBarOptions">
                To-do List
              </Link>
            </Button>
            <Button
              key="Calendar"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              path="/calendar"
            >
              <Link to="/calendar" className="nabBarOptions">
                Calendar
              </Link>
            </Button>
            {/* <Button
              key="Get Started"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              path="/signup"
            >
              <Link to="/signup" className="nabBarOptions">
                Get Started
              </Link>
            </Button> */}
          </Box>
          {/* User Account Options */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open User Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <img src="https://ui-avatars.com/api/?rounded=true&name=John+Doe"></img>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="sign in" onClick={handleCloseNavMenu}>
                <Link to="/login" className="menuOptions" textAlign="center">
                  Sign In
                </Link>
              </MenuItem>
              <MenuItem key="logout" onClick={(Logout, handleCloseNavMenu)}>
                <Link to="/signup" className="menuOptions" textAlign="center">
                  Sign Up
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
