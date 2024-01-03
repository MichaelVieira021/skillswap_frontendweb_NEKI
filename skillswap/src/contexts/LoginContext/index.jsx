import React from 'react';
import { createContext } from 'react';
import {configurarToken, verificarUsuario } from '../../api/api';
import { useNavigate } from 'react-router-dom';


export const LoginContext = createContext({})

export const LoginProvider = ({children}) => {
    const navi = useNavigate()
    
    function verificarLogin(email, senha, gravarSenha) {
        verificarUsuario(email, senha).then((response) => {
            console.log(response.data.token)
            configurarToken(response.data.token)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.usuario));

            if(gravarSenha){
                localStorage.setItem('gravarSenha', JSON.stringify({login: email, senha: senha}));
            }else if (!gravarSenha){
                localStorage.removeItem('gravarSenha')
            }

            navi('/')
        }).catch((error) => {
            console.log(error.response.data.mensagem)
        })
    }


    return (
        <LoginContext.Provider value={{
            verificarLogin,
        }}>{children} 
        </LoginContext.Provider>
    )
}