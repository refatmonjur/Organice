import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import SignUp from "./components/SignUpPage/SignUp";
import Home from "./components/HomePage/Home";
import ToDo from "./components/TodoPage/todo";
import Calendar from "./components/CalendarPage/Calendar";
import Flashcard from "./components/FlashcardsPage/Flashcard";
import NewUserTodo from "./components/TodoPage/NewUserTodo";
import NewHome from "./components/HomePage/NewHome";

function App() {
  return (
    <div className="app">
      {/* add routes as you start each components. For now we have this many routes */}
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/flashcard" exact component={Flashcard} />
          <Route path="/todo" exact component={ToDo} />
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/newTodo" exact component={NewUserTodo} />
          <Route path="/home" exact component={NewHome} />
          {/* <Route path= "*" exact component={PageNotFound} />  */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
