import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudentPage";
import EditStudent from "./pages/EditStudentPage";
import AttendancePage from "./pages/AttendancePage";  
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
    <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
        </>
  );
}

export default App;
