import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Companies from "./Screens/Companies";
import MainScreen from "./Screens/MainScreen";
import Materials from './Screens/Materials';

//material ui imports
import { AppBar, Button, CssBaseline, Toolbar, Typography } from "@mui/material";

function App() {
     
  return(
    <div className="App">
      <Router>
      <AppBar position="sticky">
      <CssBaseline />
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Robin Enterprises
          </Typography>
          <Button color="inherit"><Link to="/" style={{color:"white"}}>Home</Link></Button>
          <Button color="inherit"><Link to="/materials" style={{color:"white"}}>Materials</Link></Button>
          <Button color="inherit"><Link to="/companies" style={{color:"white"}}>Companies</Link></Button>
        </Toolbar>
      </AppBar>
      
      
        <Routes>
          <Route path="/" element={<MainScreen/>} />
          <Route path="/materials" element={<Materials/>} />
          <Route path="/companies" element={<Companies/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
