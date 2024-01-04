import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { configurarToken, delUserSkill, levelDown, levelUp, skillsUser } from '../../api/api';
import { LoginContext } from '../../contexts/LoginContext';
import magoNegroImg from '../../assets/img/magoNegro2.png'
import { Header } from '../../components/Header';
import backgroundListIMG from '../../assets/img/backgroundList.png';
import { FaBookSkull } from "react-icons/fa6";

export function SkillsUser() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  // const { token } = useContext(LoginContext)

  useEffect(()=>{buscarSkill()}, [])
  
  const buscarSkill = () => {
    // const token = localStorage.getItem('token')
    // configurarToken(token)

    skillsUser(user.id).then((response)=>{
        setData(response.data)
        console.log(response.data)
    }).catch((error)=>{})
  }

  const aumentarLevelSkill = (id) => {
    levelUp(id).then(()=>{
      buscarSkill()
      console.log("ok")
    }).catch((e)=>{
      console.log(e.response.data.mensagem)
    })
  }

  const baixarLevelSkill = (id) => {
    levelDown(id).then(()=>{
      buscarSkill()
      console.log("ok")
    }).catch((e)=>{
      console.log(e.response.data.mensagem)
    })
  }

  const deletarSkillUser = (id) => {
    delUserSkill(id).then(()=>{
      buscarSkill()
      console.log("ok")
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (

      <div id='paginaHomeListSkillUser'>
        <Header/>
        
        {/* <br/> */}

        <p id='tituloListaDeSkills'>HABILIDADES</p>
        
        <div id='containerPrincipal'>
          {/* <div id='imagemMagoNegro'>
            <img src={magoNegroImg} alt="Mago" />
          </div> */}

          <div id='containerListaDeSkillsUser'>
            {/* <button id='buttonAddSkill'>ADICIONAR NOVA SKILL</button>  */}
            <div id='visualizarTodasSkills'>
            {/* // style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px', maxHeight: '420px', overflowY: 'auto'}}> */}
                {data.map(item => (
                  <div key={item.id} id="visualizarSkillUserPorId">
                    <div id='boxSkillUserLvl'>
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img  src={item.skill.foto} alt="Descrição do SVG" />
                      </div>
                      
                      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: "6px", width: "100%", position: 'relative'}}>
                        {/* <label>
                          ID: {item.id}
                        </label> */}
                        <label style={{position: 'relative', fontWeight: "600", fontSize: "1.05rem"}}>
                          {item.skill.nome}
                        </label>

                        <label>
                          AMP: {item.skill.tecAmp}%
                        </label>

                        <label>
                          ATK: {item.skill.atkAdicional}
                        </label>

                        <label>
                          DURAÇÃO: {item.skill.duracao.toFixed(2)}
                        </label>

                        <p
                        style={{cursor: 'pointer', position: 'absolute', right: "0rem", top: "0rem", color: 'tomato'}}
                        // src={lixeiraIcon}
                        alt="remover"
                        onClick={() => deletarSkillUser(item.id)}
                        // tabIndex={selecionaveis}
                        // onKeyDown={() => { (event.key === "Enter") && removerPonto(item.id) }} 
                        >X</p>


                        <div id="containerLevel">
                        <p>LEVEL</p>
                        <div id="tamanhoFontBox">
                          <button className="botao-diminuir" onClick={()=> baixarLevelSkill(item.id)}>
                            -
                          </button>
                          <div id="tamanho">{item.level} </div>
                          <button className="botao-aumentar" onClick={()=> aumentarLevelSkill(item.id)}>
                            +
                          </button>
                        </div>
                      </div>


                      </div>
                    

                    </div>
                      {/* <div id="containerLevel">
                        <p>LEVEL: </p>
                        <div id="tamanhoFontBox">
                          <button className="botao-diminuir" onClick={()=> baixarLevelSkill(item.id)}>
                            -
                          </button>
                          <div id="tamanho">{item.level} </div>
                          <button className="botao-aumentar" onClick={()=> aumentarLevelSkill(item.id)}>
                            +
                          </button>
                        </div>
                      </div> */}
                    
                  </div>

                ))}
            </div>
            <button id='buttonAddSkill'>ADICIONAR NOVA SKILL</button> 
          </div>
          {/* <div id='imagemMagoNegro'>
            <img src={magoNegroImg} alt="Mago" />
          </div> */}
        </div>
      </div>
  )
}
