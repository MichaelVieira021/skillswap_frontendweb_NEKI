import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { InputSenha } from '../../components/InputSenha';
import skillswaploginIMG from '../../assets/img/skillswaplogincadastro.jpeg'
import { LoginContext } from '../../contexts/LoginContext';
import { Link } from 'react-router-dom';
import { InputLogin } from '../../components/InputLogin';
import Checkbox from '@mui/material/Checkbox';
import {  purple } from '@mui/material/colors';

export const Login = () => {
    const { verificarLogin} = useContext(LoginContext);
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [gravarSenha, setGravarSenha] = useState(false);

    useEffect(()=> {
        if(localStorage.getItem('gravarSenha')){
            var salvos = JSON.parse(localStorage.getItem('gravarSenha'))
            setLogin(salvos.login)
            setSenha(salvos.senha)
            setGravarSenha(true)
        }
    }, [])

    useEffect(()=> {}, [verificarLogin])
    useEffect(()=> {}, [gravarSenha])

    const gravarLimparSenhaStorage = () => {
        setGravarSenha(!gravarSenha)

        if(gravarSenha){
            localStorage.removeItem('gravarSenha')
        }
    }

    return (
        <div id="backgroundLogin">

            <div id='containerFormularioLoginCompleto'> 
                <div id='containerImagemFormularioLogin'>
                    <img src={skillswaploginIMG} alt="" />
                </div>

                <div id='containerFormularioLogin'>
                    <div id='containerInputs'>
                        <p id='tituloLogin'>LOGIN</p>

                        <InputLogin setLogin={setLogin} login={login} placeholder="Login" style={{marginTop: "10px"}}/>

                        <InputSenha setSenha={setSenha} senha={senha} placeholder="Senha"/>

                        <div id='gravadorDeSenha'>
                            <Checkbox color="secondary" 
                                style={{width: "12px", height: "12px", marginRight: "5px"}}
                                sx={{
                                    color: purple[800],
                                    '&.Mui-checked': {
                                    color: purple[600],
                                    }
                                }}
                                checked={gravarSenha} size="small" onClick={() => gravarLimparSenhaStorage()} 
                            />
                            <p>Gravar senha</p>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: "100%"}}>
                    <button onClick={()=> verificarLogin(login, senha, gravarSenha)}>ENTRAR</button>
                    <p>Não possui conta?  <Link to={"/Cadastro"}> Cadastre-se</Link></p>
                    </div>
                </div>

            </div>
        </div>
    )
}