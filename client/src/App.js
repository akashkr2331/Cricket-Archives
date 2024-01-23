
import './App.css';
// import "./styles/"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import Layout from "./pages/layout";
import Home from "./pages/home";
import NewMatch from "./pages/match/newMatch";
import Show from "./pages/match/show";
import NoPage from "./pages/noPage";
import Edit from "./pages/match/edit";
import Start from "./pages/start"
import Login from "./pages/auth/login"
import Signup from "./pages/auth/signup"
import Navbar from './pages/navbar';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Comments from "./pages/profile/comments"
import Likes from "./pages/profile/likes"
import Posts from "./pages/profile/posts"

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar/>
      <Routes>
          <Route path="/" element={<Start/>} />
          <Route path="Home" element={<Home/>} />
          <Route path="NewMatch" element={ isAuth? <NewMatch /> : <Navigate to="/" />} />
          <Route path="show/:id" element={ <Show/>} />
          <Route path="edit/:id" element={isAuth? <Edit/> : <Navigate to="/" />} />
          <Route path="Login" element={<Login/>} />
          <Route path="Signup" element={<Signup />} />
          {/* <Route path="Profile/:id" element={<ProfilePage/>}/> */}
            <Route path="Profile/:id/comments" element={<Comments />} />
            <Route path="Profile/:id/likes" element={<Likes />} />
            <Route path="Profile/:id/posts" element={<Posts />} />
          <Route path="*" element={isAuth? <NoPage /> : <Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
