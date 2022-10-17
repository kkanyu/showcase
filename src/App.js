// Kaylene-Nhu Nguyen @ Mohawk College, 2022
import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.js';
import { Personal } from './pages/Personal';
import { Summary } from './pages/Summary';
import { Error } from './pages/Error';

export default function App() {

  // Defaults for managing the multi-step form.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    hcn: 0,
    gender: "M"
  });

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home formData={formData} setFormData={setFormData} />} />
          <Route path="/personal" element={<Personal formData={formData} setFormData={setFormData} />} />
          <Route path="/summary" element={<Summary formData={formData} setFormData={setFormData} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}