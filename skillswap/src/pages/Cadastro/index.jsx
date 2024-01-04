import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { InputSenha } from '../../components/InputSenha';
import { LoginContext } from '../../contexts/LoginContext';
import { useSnackbar } from 'notistack';
import skillswaploginIMG from '../../assets/img/skillswaplogincadastro.jpeg'
import { InputLogin } from '../../components/InputLogin';

export const Cadastro = () => {
    const {cadastrarUsuario} = useContext(LoginContext)
    const [login, setLogin] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();
    const {enqueueSnackbar} = useSnackbar()

    useEffect(()=> {}, [])

    const cadastrarNovoUsuario = () => {
        if(senha === confirmarSenha){
            cadastrarUsuario(login, senha);
        }else{
            enqueueSnackbar("senhas não coincidem!",{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
        }
    }
    return (
        <div id="backgroundCadastro">
            <div id='containerFormularioCadastroCompleto'> 
                <div id='containerImagemFormularioCadastro'>
                    <img src={skillswaploginIMG} alt="" />
                </div>

                <div id='containerFormularioCadastro'>
                    <div id='containerInputs'>
                        <p id='tituloCadastro'>REGISTER</p>

                        <InputLogin setLogin={setLogin} login={login} placeholder="Login"/>

                        <InputSenha setSenha={setSenha} senha={senha} placeholder="Senha"/>

                        <InputSenha setSenha={setConfirmarSenha} senha={confirmarSenha} placeholder="Confirmar"/>

                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: "100%"}}>
                        <button onClick={cadastrarNovoUsuario}>CADASTRAR</button>
                        <p>Já possui conta? <Link to={"/login"}> Logar</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}