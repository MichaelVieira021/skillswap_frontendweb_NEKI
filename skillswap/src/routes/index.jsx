import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';

function AppRouter() {

  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Cadastro" element={<Cadastro />}/>
      </Routes>
    </div>
  );
}
export default AppRouter;
