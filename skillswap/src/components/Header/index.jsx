import logo2 from "../../assets/img/logo2.png"
import { ImExit } from "react-icons/im";
import './styles.css'
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navi = useNavigate();

    const deslogar = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navi('/login')
    }

    return (
        <div id="containerNavBar">
            <div id="containerLogoeNome" onClick={() => navi('/home')}>
                <div>
                    <img src={logo2} />
                </div>
                <p>SkillSwap</p>
            </div>

            <nav>
                <ul>
                    {/* <li>Sobre Projeto</li> */}
                    {/* <li onClick={() => navi('/')}>Mercado Negro</li> */}
                    {/* <li onClick={() => navi('/')}>Conta</li> */}
                    <li onClick={() => deslogar()} style={{display: "flex"}}> 
                        {/* <p style={{marginRight: "6px"}}>Sair</p> */}
                        <ImExit />
                    </li>
                </ul>
            </nav>
        </div>
    )
}