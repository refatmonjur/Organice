import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import "./Navbar.css";
import { useUserAuth } from "../Context/UserAuthContext";
import { useHistory } from "react-router-dom";
import Logo from "./test_logo.png";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { where } from "firebase/firestore";
const useStyles = makeStyles({
  header: {
    background: "black",
    boxShadow: "0px 0px 0px 0px",
  },
});

function NewHomeNavbar() {
  const { user } = useUserAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [reminder, setReminder] = useState([]);
  const [loading, setLoading] = useState(false);

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
  async function getUsers(db) {
    try {
      const userDocRef = doc(db, "user", user.uid);
      const data = await getDoc(userDocRef);
      const fields = [];
      fields.push(data.data());
      setCurrentUser(fields);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function getUsersReminder() {
    try {
      const TodoCollectionRef = collection(db, "user", user.uid, "todos");

      const todoQuery1 = query(
        TodoCollectionRef,
        orderBy("dueDate", "asc"),
        where("dueDate", ">=", new Date()),
        where("dueDate", "!=", "")
      );
      const unsub = onSnapshot(todoQuery1, (queryS) => {
        const todosArray1 = [];
        queryS.forEach((doc) => {
          todosArray1.push({ ...doc.data(), id: doc.id });
        });
        setReminder(todosArray1);
      });
      setLoading(true);
      return () => unsub();
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleNotification = () => {
    for (let i = 0; i < reminder.length; i++) {
      const date = new Date(reminder[i].dueDate.toDate());
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const new_date = date.toLocaleDateString(undefined, options);

      Store.addNotification({
        title: reminder[i].title,
        message: "⏰" + " " + new_date,
        type: "warning",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          showIcon: true,
          onScreen: true,
          pauseOnHover: true,
        },
      });
    }
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

  const handlenewUserTodo = async (e) => {
    const recordCol = collection(db, "user", user.uid, "todos");
    onSnapshot(recordCol, (querySnapshot) => {
      const record = [];
      querySnapshot.forEach((doc) => {
        record.push(doc.data());
      });
      if (record.length === 0) {
        history.push("/newTodo");
      } else {
        history.push("/todo");
      }
    });
  };

  useEffect(() => {
    getUsers(db);
    console.log("i am the useEffect");
    if (user) {
      getUsersReminder();
    }
  }, []);

  return (
    <AppBar position="static" className="bg-dark">
      <ReactNotifications />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/home">
              <img src={Logo} width="85" height="68" />
            </Link>
          </Typography>
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
                <Link to="/todo" className="menuOptions">
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
              onClick={handlenewUserTodo}
              sx={{ my: 2, color: "white", display: "block" }}
              path="/todo"
            >
              <Link to="/todo" className="nabBarOptions">
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
          </Box>
          {/* User Account Options */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open User Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {currentUser.map((users) => {
                  return (
                    <img
                      src={
                        "https://ui-avatars.com/api/?rounded=true&name=" +
                        `${users?.firstName}` +
                        "+" +
                        `${users?.lastName}`
                      }
                    ></img>
                  );
                })}
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
              <MenuItem key="account" onClick={handleCloseNavMenu}>
                <Link to="/profile" className="menuOptions" textAlign="center">
                  Account
                </Link>
              </MenuItem>
              <MenuItem onClick={handleNotification} className="menuOptions">
                Notifications
              </MenuItem>
              <MenuItem onClick={Logout} className="menuOptions">
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NewHomeNavbar;
