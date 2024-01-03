import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { GiCrownedSkull } from "react-icons/gi";
import { InputSenha } from '../../components/InputSenha';
import skillswaploginIMG from '../../assets/img/skillswaplogincadastro.jpeg'
import { LoginContext } from '../../contexts/LoginContext';

export const Login = () => {
    const { verificarLogin} = useContext(LoginContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [gravarSenha, setGravarSenha] = useState(false);

    useEffect(()=> {
        if(localStorage.getItem('gravarSenha')){
            var salvos = JSON.parse(localStorage.getItem('gravarSenha'))
            console.log(salvos.senha)
            setEmail(salvos.login)
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
                        <div style={{display: 'flex',flexDirection: 'column', position: 'relative', width: "85%", marginTop: "10px"}}>
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
                            <input type="text" placeholder='Login' onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </div>

                        <InputSenha setSenha={setSenha} senha={senha} placeholder="Senha"/>

                        <div id='gravadorDeSenha'>
                                            
                            <input
                                style={{width: "12px", height: "12px", marginRight: "5px"}}
                                type="checkbox"
                                checked={gravarSenha}
                                onChange={() => gravarLimparSenhaStorage()}
                            />
                            <p>Gravar senha</p>
                        </div>

                    </div>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <button onClick={()=> verificarLogin(email, senha, gravarSenha)}>ENTRAR</button>
                    <p>Não possui conta? Cadastre-se</p>

                    </div>

                </div>

            </div>
        </div>
    )
}