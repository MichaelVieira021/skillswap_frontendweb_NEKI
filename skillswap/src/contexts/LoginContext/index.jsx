import React, { useEffect } from 'react';
import { createContext } from 'react';
import {cadastrarNovoUsuario, configurarToken, verificarToken, verificarUsuario } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const LoginContext = createContext({})

export const LoginProvider = ({children}) => {
    const {enqueueSnackbar} = useSnackbar()
    const navi = useNavigate()

    useEffect(() => {checkToken();}, []);

    const checkToken = () => {
        if(localStorage.getItem('token') && localStorage.getItem('user')){
            const storedToken = localStorage.getItem('token');

            verificarToken(storedToken).then((response)=>{
                if(response.data === "Token válido"){
                    configurarToken(storedToken);
                }else{
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }).catch((error)=>{
                console.log("oioioi")
                enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
            })

        }else{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };
    
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
            navi('/home')
        }).catch((error) => {
            enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
        })
    }


    function cadastrarUsuario(login, senha){
        cadastrarNovoUsuario(login, senha).then(()=>{
            enqueueSnackbar("Cadastrado com sucesso!",{variant:"success", anchorOrigin:{vertical:'top',horizontal:'right'}})
            navi('/login')
        }).catch((error)=>{
            enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
        })
    }

    return (
        <LoginContext.Provider value={{
            verificarLogin,
            cadastrarUsuario,
            checkToken
        }}>{children} 
        </LoginContext.Provider>
    )
}