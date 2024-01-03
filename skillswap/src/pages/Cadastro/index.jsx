import { Link, json, useNavigate } from 'react-router-dom'
import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { InputSenha } from '../../components/InputSenha';
import { GiCrownedSkull } from "react-icons/gi";
import { FaBookSkull } from "react-icons/fa6";
import { LoginContext } from '../../contexts/LoginContext';



export const Cadastro = () => {
    const {cadastrarUsuario} = useContext(LoginContext)
    const [login, setLogin] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();
    // const navigate = useNavigate()

    useEffect(()=> {}, [])
    return (
        <div id="backgroundCadastro">

            <div id='containerFormularioCadastroCompleto'> 
                <div id='containerImagemFormularioCadastro'>
                    <img src="https://th.bing.com/th/id/OIG.6kI7931F_IpGeq0fyuk6?pid=ImgGn" alt="" />
                </div>

                <div id='containerFormularioCadastro'>
                    <div id='containerInputs'>
                        <p id='tituloCadastro'>REGISTER</p>

                        <div style={{display: 'flex',flexDirection: 'column', position: 'relative', width: "85%"}}>
                            <GiCrownedSkull 
                                style={{ 
                                    width: '40px', 
                                    position: 'absolute', 
                                    left: '-6px', 
                                    top: '7%', 
                                    color: 'gray',
                                    fontSize: 25
                                }}
                            />
                            <input type="text" placeholder='Usuario' onChange={(e) => {setLogin(e.target.value)}} value={login}/>
                        </div>

                        <InputSenha setSenha={setSenha} senha={senha} placeholder="Senha"/>

                        <InputSenha setSenha={setConfirmarSenha} senha={confirmarSenha} placeholder="Confirmar"/>


                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: "100%"}}>
                    <button onClick={()=>cadastrarUsuario(login, senha)}>CADASTRAR</button>
                    <p>Já possui conta? <Link to={"/login"}> Logar</Link></p>

                    </div>

                </div>

            </div>
        </div>
    )
}