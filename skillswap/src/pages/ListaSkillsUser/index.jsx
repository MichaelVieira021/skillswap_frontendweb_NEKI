import './styles.css'
import { useEffect, useState } from 'react'
import { 
  adicionarSkillUser, 
  delUserSkill, 
  levelDown, 
  levelUp,
  obterTodasSkillsUserNot, 
  skillsUser 
} from '../../api/api';
import { Header } from '../../components/Header';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CardSkill } from '../../components/CardSkill';

export function SkillsUser() {
  const [data, setData] = useState([]);
  const [listSkills, setListSkills] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem('user')))
  const [modalShop, setModalShop] = useState(false)
  const [levelSkillObter, setLevelSkillObter] = useState(1);
  const [skillSelecionada, setSkillSelecionada] = useState({})
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => { buscarSkill() }, [])
  useEffect(() => {}, [skillSelecionada])

  useEffect(() => {
    if (levelSkillObter > 20) {
      setLevelSkillObter(20)
    }
    if (levelSkillObter < 1) {
      setLevelSkillObter(1)
    }
  }, [levelSkillObter])

  const buscarSkill = () => {
    skillsUser(user.id).then((response) => {
      setData(response.data)
    }).catch((e) => {
      enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const aumentarLevelSkill = (id) => {
    levelUp(id).then(() => {
      buscarSkill()
      enqueueSnackbar("Level up!!!", { variant: "success", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }).catch((e) => {
      enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const baixarLevelSkill = (id) => {
    levelDown(id).then(() => {
      buscarSkill()
      enqueueSnackbar("Level down!!!", { variant: "success", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }).catch((e) => {
      enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const deletarSkillUser = (id) => {
    delUserSkill(id).then(() => {
      buscarSkill()
    }).catch((e) => {
      enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const obterListaSkills = () => {
    obterTodasSkillsUserNot(user.id).then((response) => {
      setListSkills(response.data)
      setSkillSelecionada(response.data[0])
      setModalShop(true)
    }).catch((e) => {
      enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const handleLevelSkillObter = (e) => {
    if (levelSkillObter <= 20) {
      setLevelSkillObter(e.target.value);
    }
  };

  const adquidrirSkill = () => {
    adicionarSkillUser(user.id, skillSelecionada.id, levelSkillObter).then(() => {
      buscarSkill()
      setModalShop(false)
      setLevelSkillObter(1)
      enqueueSnackbar("Skill adquirida com sucesso!", { variant: "success", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }).catch((e) => {
      enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  return(

    <div id='paginaHomeListSkillUser'>
      <Header />
      <p id='tituloListaDeSkills'>HABILIDADES</p>

      <div id='containerPrincipal'>
        <div id='containerListaDeSkillsUser'>
          <div id='visualizarTodasSkills'>
            {data.map(item => (
              <CardSkill 
                key={item.id}
                idSkillUser={item.id} 
                skill={item.skill} 
                level={item.level} 
                aumentarLevelSkill={()=>aumentarLevelSkill(item.id)} 
                baixarLevelSkill={()=> baixarLevelSkill(item.id)}
                deletarSkillUser={()=> deletarSkillUser(item.id)}
              />
            ))}
          </div>

          <Button id='buttonAddSkill' variant="contained" onClick={obterListaSkills}>ADICIONAR NOVA SKILL</Button>

          <Modal open={modalShop}>
            <Box id='ModalObterSkill'>
              <p id='tituloModalObterSkill'>Skills</p>
              <div style={{ display: 'flex', gap: 4 }}>
                <Autocomplete
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

              <CardSkill skill={skillSelecionada}/>

              <div style={{ display: 'flex', justifyContent: 'space-around', width: "100%" }}>
                <Button variant="contained" onClick={adquidrirSkill} size="large" startIcon={<BookmarksIcon color="action" sx={{ fontSize: "80px" }} />}>Adiquirir SKILL</Button>
                <Button variant="contained" endIcon={<CancelIcon />} size="large" color="error" onClick={() => setModalShop(false)}>Cancelar</Button>
              </div>

            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}
