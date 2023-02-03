import { BrowserRouter, Routes, Navigate , Route} from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {

  const mode = useSelector((state)=> state.theme);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state)=> state.token));

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          
            <Routes>
              <Route exact path = '/' element={<Login/>}/>
              <Route path = '/home' element={isAuth ? <Home/> : <Navigate to ='/' />}/>
              <Route path = '/profile/:userId' element={ isAuth ? <Profile/>  : <Navigate to ='/' />}/>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
