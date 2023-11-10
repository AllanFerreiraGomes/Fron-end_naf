import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Cadastrar from './pages/cadastrar/Cadastrar';
import Login from '../src/pages/login/Login';
import { UserProvider } from "./context/UserProvider";
import PerfilUser from './pages/perfilUser/PerfilUser'

function App() {
  return (
    <Router>
     <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfiluser" element={<PerfilUser />} />
        </Routes>
       </UserProvider>
    </Router>
  );
}

export default App;
