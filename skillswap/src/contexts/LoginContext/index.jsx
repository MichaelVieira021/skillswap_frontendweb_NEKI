import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import {cadastrarNovoUsuario, configurarToken, verificarToken, verificarUsuario } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export const LoginContext = createContext({})

export const LoginProvider = ({children}) => {
    const {enqueueSnackbar} = useSnackbar()
    const [authenticated, setAuthenticated] = useState(false);
    const navi = useNavigate()

    useEffect(() => {
        const checkToken = () => {
            if(localStorage.getItem('token') && localStorage.getItem('user')){
                const storedToken = localStorage.getItem('token');

                verificarToken(storedToken).then((response)=>{
                    if(response.data === "Token válido"){
                        configurarToken(storedToken);
                        console.log("to aqui")
                        setAuthenticated(true)
                        // navi('/home');
                    }else{
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        // navi('/login');
                    }
                }).catch((error)=>{
                    console.log(error.response.data.mensagem)
                })

            }else{
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // navi('/login');
            }
        };
        checkToken();
    }, []);
    
    function verificarLogin(login, senha, gravarSenha) {
        verificarUsuario(login, senha).then((response) => {
            console.log(response.data.token)
            configurarToken(response.data.token)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.usuario));

            if(gravarSenha){
                localStorage.setItem('gravarSenha', JSON.stringify({login: login, senha: senha}));
            }else if (!gravarSenha){
                localStorage.removeItem('gravarSenha')
            }
            enqueueSnackbar("Login efetuado com sucesso!",{variant:"success", anchorOrigin:{vertical:'top',horizontal:'right'}})
            setAuthenticated(true)
            navi('/home')
        }).catch((error) => {
            enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
            console.log(error.response.data.mensagem)
        })
    }


    function cadastrarUsuario(login, senha){
        cadastrarNovoUsuario(login, senha).then(()=>{
            enqueueSnackbar("Cadastrado com sucesso!",{variant:"success", anchorOrigin:{vertical:'top',horizontal:'right'}})
            navi('/login')
        }).catch((error)=>{
            enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
            console.log(error.response.data.mensagem)
        })
    }


    return (
        <LoginContext.Provider value={{
            verificarLogin,
            cadastrarUsuario,
            authenticated
        }}>{children} 
        </LoginContext.Provider>
    )
}