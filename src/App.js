import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
