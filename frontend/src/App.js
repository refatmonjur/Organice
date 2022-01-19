import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import SignUp from "./components/SignUpPage/SignUp";
import Home from "./components/HomePage/Home";
import Todo from "./components/TodoPage/Todo";
import Calendar from "./components/CalendarPage/Calendar";
import Flashcard from "./components/FlashcardsPage/Flashcard";
import NewUserTodo from "./components/TodoPage/NewUserTodo";
import NewHome from "./components/HomePage/NewHome";
import AddNewDeck from "./components/FlashcardsPage/AddNewDeck";
import { UserAuthContextProvider } from "./components/Context/UserAuthContext";
import ProtectedRoute from "./components/Context/ProtectedRoutes";

function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            {/* <Route path="/flashcard" exact component={Flashcard} /> */}
            {/* <Route path="/todo" exact component={ToDo} />
            <Route path="/calendar" exact component={Calendar} /> */}
            <ProtectedRoute path="/home">
              <NewHome />
            </ProtectedRoute>
            <ProtectedRoute path="/flashcard">
              <Flashcard />
            </ProtectedRoute>
            <ProtectedRoute path="/addNewDeck">
              <AddNewDeck />
            </ProtectedRoute>
            
            <ProtectedRoute path="/todo">
              <Todo />
            </ProtectedRoute>
            <ProtectedRoute path="/newTodo">
              <NewUserTodo />
            </ProtectedRoute>

            <ProtectedRoute path="/calendar">
              <Calendar />
            </ProtectedRoute>

            {/* <Route path="/newTodo" exact component={NewUserTodo} /> */}
          </Switch>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
