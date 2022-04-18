import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Companies from "./Screens/Companies";
import Materials from './Screens/Materials';
import CustomDrawer from './Components/CustomDrawer'
//material ui imports
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import HomePage from "./Screens/HomePage";

function App() {
     
  return(
    <div className="App">
      <Router>
      <AppBar position="sticky">
      <CssBaseline />
      
        <Toolbar>
        <CustomDrawer/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Robin Enterprises
          </Typography>
          </Toolbar>
      </AppBar>
      
      
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/materials" element={<Materials/>} />
          <Route path="/companies" element={<Companies/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
