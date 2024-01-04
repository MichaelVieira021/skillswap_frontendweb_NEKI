import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { adicionarSkillUser, configurarToken, delUserSkill, levelDown, levelUp, obterTodasSkills, obterTodasSkillsUserNot, skillsUser } from '../../api/api';
import { LoginContext } from '../../contexts/LoginContext';
import magoNegroImg from '../../assets/img/magoNegro2.png'
import { Header } from '../../components/Header';
import backgroundListIMG from '../../assets/img/backgroundList.png';
import { FaBookSkull } from "react-icons/fa6";
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function SkillsUser() {
  const [data, setData] = useState([]);
  const [listSkills, setListSkills] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [modalShop, setModalShop] = useState(false)
  const [levelSkillObter, setLevelSkillObter] = useState(1);
  const [skillSelecionada, setSkillSelecionada] = useState({})
  const {enqueueSnackbar} = useSnackbar()

  useEffect(()=>{buscarSkill()}, [])
  useEffect(()=>{}, [])
  useEffect(()=>{console.log(skillSelecionada)}, [skillSelecionada])

  useEffect(() => {
    if(levelSkillObter > 20){
      setLevelSkillObter(20)
    }
    if(levelSkillObter < 1){
      setLevelSkillObter(1)
    }
}, [levelSkillObter])
  
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
      enqueueSnackbar("Level up!!!",{variant:"success", anchorOrigin:{vertical:'top',horizontal:'right'}})
    }).catch((e)=>{
      enqueueSnackbar(e.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
      console.log(e.response.data.mensagem)
    })
  }

  const baixarLevelSkill = (id) => {
    levelDown(id).then(()=>{
      buscarSkill()
      console.log("ok")
      enqueueSnackbar("Level down!!!",{variant:"warning", anchorOrigin:{vertical:'top',horizontal:'right'}})
    }).catch((e)=>{
      enqueueSnackbar(e.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
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

  const obterListaSkills = () => {
    obterTodasSkillsUserNot(user.id).then((response)=>{
      setListSkills(response.data)
      setSkillSelecionada(response.data[0])
      console.log(response.data)
      setModalShop(true)
    }).catch(()=>{

    }) 
  }

  const handleLevelSkillObter = (e) => {
    if(levelSkillObter <= 20){
        setLevelSkillObter(e.target.value);
    }
  };

  const adquidrirSkill = () => {
    adicionarSkillUser(user.id, skillSelecionada.id, levelSkillObter).then(()=>{
      buscarSkill()
      setModalShop(false)
      setLevelSkillObter(1)
      enqueueSnackbar("Skill adquirida com sucesso!",{variant:"success", anchorOrigin:{vertical:'top',horizontal:'right'}})
    }).catch(()=>{

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
            <button id='buttonAddSkill' onClick={obterListaSkills}>ADICIONAR NOVA SKILL</button>
            <Modal
              open={modalShop}
              // onClose={handleClose}
              // aria-labelledby="modal-modal-title"
              // aria-describedby="modal-modal-description"
            >

              <Box  id='ModalObterSkill'>
                <p id='tituloModalObterSkill'>Skills</p>
                <div style={{display: 'flex', gap: 4}}>
                  <Autocomplete
                  // style={{backgroundColor: "white"}}
                    disablePortal
                    disableClearable
                    id="combo-box-demo"
                    options={listSkills || []}
                    getOptionLabel={(option) => option.nome}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Lista de Skills" />}
                    value={skillSelecionada}
                    onChange={(event, value) => setSkillSelecionada(value)}
                  />
                  <TextField
                    // style={{backgroundColor: "white"}}
                    id="outlined-number"
                    label="Level"
                    type="number"
                    value={levelSkillObter}
                    onChange={handleLevelSkillObter}
                    sx={{ width: 70 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
    
                  />
                </div>

                <div id='visualizarSkillUserPorId' style={{width: "363px", margin: 'auto 0', marginTop: "15px", marginBottom: "35px"}}>
                  <div id='boxSkillUserLvl'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={skillSelecionada.foto} alt="Descrição do SVG" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: "6px", width: "100%", position: 'relative' }}>
                        <label style={{ fontWeight: "600", fontSize: "1.05rem" }}>
                            {skillSelecionada.nome}
                        </label>

                        <label>
                            AMP: {skillSelecionada.tecAmp}%
                        </label>

                        <label>
                            ATK: {skillSelecionada.atkAdicional}
                        </label>

                        <label>
                            {/* DURAÇÃO: {skillSelecionada.duracao.toFixed(2)} */}
                        </label>

                        <div id="containerLevel" style={{top: 4}}>
                          <p>LEVEL</p>
                          <div id="tamanho">1</div>
                        </div>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-around', width: "100%"}}>
                <Button variant="contained" onClick={adquidrirSkill} size="large" startIcon={<BookmarksIcon color="action" sx={{ fontSize: "80px" }}/>}>Adiquirir SKILL</Button>
                <Button variant="contained" endIcon={<CancelIcon />} size="large" color="error" onClick={()=>setModalShop(false)}>Cancelar</Button>
                </div>

              </Box>
            </Modal>

          </div>
          {/* <div id='imagemMagoNegro'>
            <img src={magoNegroImg} alt="Mago" />
          </div> */}
        </div>
      </div>
  )
}
