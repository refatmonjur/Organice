import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import SignUp from "./components/SignUpPage/SignUp";
import Home from "./components/HomePage/Home";
import ToDo from "./components/TodoPage/todo";
import Calendar from "./components/CalendarPage/Calendar";
import Flashcard from "./components/FlashcardsPage/Flashcard";
import NewHome from "./components/HomePage/NewHome";
import { UserAuthContextProvider } from "./components/Context/UserAuthContext";
import ProtectedRoute from "./components/Context/ProtectedRoutes";

function App() {
  return (
    <div className="app">
      {/* add routes as you start each components. For now we have this many routes */}
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
            <ProtectedRoute path="/todo">
              <ToDo />
            </ProtectedRoute>
            <ProtectedRoute path="/calendar">
              <Calendar />
            </ProtectedRoute>
          </Switch>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
