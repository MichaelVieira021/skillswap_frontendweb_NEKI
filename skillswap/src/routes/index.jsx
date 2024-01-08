import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { SkillsUser } from '../pages/ListaSkillsUser';
import { LoginProvider } from '../contexts/LoginContext';
import { SnackbarProvider } from 'notistack';
import { PrivateRoute } from './privateRoute';
import { PublicRoute } from './publicRoute';
import { PageNotFound } from '../pages/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <LoginProvider>
          <Routes>
          <Route path="/" element={<PrivateRoute><SkillsUser /></PrivateRoute>}/> 
            <Route path="/Login" element={<PublicRoute><Login /></PublicRoute>}/>
            <Route path="/Cadastro" element={<PublicRoute><Cadastro /></PublicRoute>}/>
            <Route path="/home" element={<PrivateRoute><SkillsUser /></PrivateRoute>}/> 
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </LoginProvider>
      </SnackbarProvider>
    </BrowserRouter> 
  )
};

export default AppRouter;
