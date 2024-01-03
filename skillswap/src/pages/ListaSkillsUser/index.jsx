import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { configurarToken, delUserSkill, levelDown, levelUp, skillsUser } from '../../api/api';
import { LoginContext } from '../../contexts/LoginContext';
import magoNegroImg from '../../assets/img/magoNegro2.png'
import { Header } from '../../components/Header';
import lixeiraIcon from '../../assets/img/Trash.png';

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

      <div style={{backgroundColor: "#010216", width: "100%", display: 'flex', height: "100vh", flexDirection: 'column'}}>
        <Header/>
        
        <br/>
        
        <div style={{ display: 'flex', backgroundColor: "rgb(27, 20, 39)", alignItems: 'center', width: "100%"}}>
        <div id='imagemMagoNegro'>
          <img src={magoNegroImg} alt="Descrição do SVG" />
          <button id='buttonAddSkill'>ADICIONAR NOVA SKILL</button>
        </div>

          <div id='visualizarTodasSkills'>
          {/* // style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px', maxHeight: '420px', overflowY: 'auto'}}> */}
              {data.map(item => (
                <div key={item.id} id="visualizarSkillUserPorId">
                  <div id='boxSkillUserLvl'>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img  src={item.skill.foto} alt="Descrição do SVG" />
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: "6px", width: "100%"}}>
                      {/* <label>
                        ID: {item.id}
                      </label> */}
                      <label style={{position: 'relative'}}>
                        {item.skill.nome}
                        <img
                      style={{ height: '2.5rem', width: '2.5rem', cursor: 'pointer', position: 'absolute', right: "0rem", top: "0.2rem", color: 'tomato'}}
                      src={lixeiraIcon}
                      alt="remover"
                      onClick={() => deletarSkillUser(item.id)}
                      // tabIndex={selecionaveis}
                      // onKeyDown={() => { (event.key === "Enter") && removerPonto(item.id) }} 
                      />
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

                    </div>
                  </div>

                  <div id="containerTamanhoFont">
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
                  </div>
                  
                </div>

              ))}
          </div>  
        </div>
      </div>
  )
}
