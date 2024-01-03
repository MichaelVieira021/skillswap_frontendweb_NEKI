import { Link, json, useNavigate } from 'react-router-dom'
import './styles.css'
import { useEffect, useState } from 'react'
import { InputSenha } from '../../components/InputSenha';
import { GiCrownedSkull } from "react-icons/gi";
import { cadastrarUsuario } from '../../api/api';
import { FaBookSkull } from "react-icons/fa6";


export const Cadastro = () => {
    const [email, setEmail] = useState();
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
                        {/* <div style={{display: 'flex',flexDirection: 'column', position: 'relative', width: "85%", marginTop: "5px"}}>
                            <FaBookSkull 
                                style={{ 
                                    width: '40px', 
                                    position: 'absolute', 
                                    left: '-6px', 
                                    top: '14%', 
                                    color: 'gray',
                                    fontSize: 18
                                }}
                            />
                            <input type="text" placeholder='E-mail' onChange={(e) => {setEmail(e.target.value)}} value={email}/>
                        </div> */}

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
                            <input type="text" placeholder='Usuario' onChange={(e) => {setEmail(e.target.value)}} value={email}/>
                        </div>

                        <InputSenha setSenha={setSenha} senha={senha} placeholder="Senha"/>

                        <InputSenha setSenha={setConfirmarSenha} senha={confirmarSenha} placeholder="Confirmar"/>


                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: "100%"}}>
                    <button onClick={()=>cadastrarUsuario("michael23", email, senha)}>CADASTRAR</button>
                    <p>Já possui conta? <Link to={"/login"}> Logar</Link></p>

                    </div>

                </div>

            </div>
        </div>
    )
}