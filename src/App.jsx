import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import LoggedInRoutes from "./components/LoggedInRoutes";
import Profile from "./pages/Profile";
import CreateQuiz from "./pages/CreateQuiz";
import DashboardLayout from "./components/DashboardLayout";
import CreateQuestions from "./pages/CreateQuestions";
import AdminQuizes from "./pages/AdminQuizes";
import AttemptQuiz from "./pages/AttemptQuiz";
import QuizResult from "./pages/QuizResult";
import { useSelector } from "react-redux";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useSelector((state) => state.auth);
  const [theme, setTheme] = useState("dark");

  // Update the class of the <html> element based on the theme
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-[1200px] px-3 mx-auto min-h-screen">
        {/* Navbar with Theme Toggle */}
        {/* <header>
          <Navbar theme={theme} setTheme={setTheme} />
        </header> */}
        <Routes>
          <Route path="/" element={<LoggedInRoutes><Home /></LoggedInRoutes>} />
          <Route path="/quiz/:id" element={<LoggedInRoutes><AttemptQuiz /></LoggedInRoutes>} />
          <Route path="/quiz-results" element={<LoggedInRoutes><QuizResult /></LoggedInRoutes>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard">
            <Route index element={<LoggedInRoutes><DashboardLayout><Profile /></DashboardLayout></LoggedInRoutes>} />
            <Route path="history" element={<LoggedInRoutes><DashboardLayout><History /></DashboardLayout ></LoggedInRoutes>} />
            <Route path="create-quiz" element={<LoggedInRoutes><DashboardLayout><CreateQuiz /></DashboardLayout ></LoggedInRoutes>} />
            <Route path="create-quiz/:id" element={<LoggedInRoutes><DashboardLayout><CreateQuestions /></DashboardLayout ></LoggedInRoutes>} />
            <Route path="quizes" element={<LoggedInRoutes><DashboardLayout><AdminQuizes /></DashboardLayout></LoggedInRoutes>} />
            <Route path="edit-quiz/:id" element={<LoggedInRoutes><DashboardLayout><CreateQuiz /></DashboardLayout></LoggedInRoutes>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
