import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { SkillsUser } from '../pages/ListaSkillsUser';

function AppRouter() {

  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Cadastro" element={<Cadastro />}/>
        <Route path="/home" element={<SkillsUser />}/>
      </Routes>
    </div>
  );
}
export default AppRouter;
