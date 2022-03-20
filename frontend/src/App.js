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
import AddQACard from "./components/FlashcardsPage/AddQACard";
import AddDefinitionCard from "./components/FlashcardsPage/AddDefinitionCard";
import AddImageCard from "./components/FlashcardsPage/AddImageCard";
import { UserAuthContextProvider } from "./components/Context/UserAuthContext";
import ProtectedRoute from "./components/Context/ProtectedRoutes";
import WindowTodo from "./components/TodoPage/WindowTodo";
import WeeklyTodo from "./components/TodoPage/WeeklyTodo";
import MonthlyTodo from "./components/TodoPage/MonthlyTodo";

import StudyFlashCards from "./components/FlashcardsPage/StudyFlashCards";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import AddEventModal from "./components/CalendarPage/AddEventModal";
import Error from "./PageNotFound/Error";


import StudyFlashCards from "./components/FlashcardsPage/StudyFlashCards";
import AddMoreCardQA from "./components/FlashcardsPage/AddMoreCardQA";
import AddMoreCardWDE from "./components/FlashcardsPage/AddMoreCardWDE";
function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <ProtectedRoute path="/home">
              <NewHome />
            </ProtectedRoute>

            {/* Flashcard Routes */}
            <ProtectedRoute path="/flashcard">
              <Flashcard />
            </ProtectedRoute>
            <ProtectedRoute path="/addNewDeck">
              <AddNewDeck />
            </ProtectedRoute>
            <ProtectedRoute path="/addQACard">
              <AddQACard />
            </ProtectedRoute>
            <ProtectedRoute path="/addDefinitionCard">
              <AddDefinitionCard />
            </ProtectedRoute>
            <ProtectedRoute path="/addImageCard">
              <AddImageCard />
            </ProtectedRoute>
            <ProtectedRoute path="/addMoreCardQA">
              <AddMoreCardQA />
            </ProtectedRoute>
            <ProtectedRoute path= "/addMoreCardWDE">
              <AddMoreCardWDE/>
            </ProtectedRoute>

            {/* ToDoList Routes */}
            <ProtectedRoute path="/todo">
              <Todo />
            </ProtectedRoute>
            <ProtectedRoute path="/WindowTodo">
              <WindowTodo />
            </ProtectedRoute>
            <ProtectedRoute path="/WeeklyTodo">
              <WeeklyTodo />
            </ProtectedRoute>
            <ProtectedRoute path="/MonthlyTodo">
              <MonthlyTodo />
            </ProtectedRoute>
            <ProtectedRoute path="/calendar">
              <Calendar />
            </ProtectedRoute>
            <ProtectedRoute path="/studyFlashCards">
              <StudyFlashCards />
            </ProtectedRoute>

            {/* <Route path="/newTodo" exact component={NewUserTodo} /> */}
            <ProtectedRoute path="/newTodo">
              <NewUserTodo />
            </ProtectedRoute>
            <Route component={Error} />
          </Switch>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
