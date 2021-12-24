import React,{useEffect,useState} from "react";
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />}></Route>
      
      </Routes>
      <ToastContainer
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
        />
      <ToastContainer /> 

    </BrowserRouter>
  );
}

export default App;
