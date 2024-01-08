import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://10.0.0.114:8080/api'
})

//CONFIG TOKEN
export const configurarToken = (token) => {
    api.defaults.headers.common['Authorization'] = token;
};

export function verificarToken(token){
    return api.post("/usuarios/validar/token", null, {
        params: {
            token: token
        }
    });
};



//USER
export function verificarUsuario(login, senha){
    return api.post("/usuarios/login", {login, senha})
};

export function cadastrarNovoUsuario(login, senha){
    return api.post("/usuarios/cadastrar", {login, senha})
};


//SKILLS USER
export function skillsUser(userId){
    return api.get(`/usuarios/skillsUser?userId=${userId}`)
};

export function levelUp(id){
    return api.patch(`/usuarios/levelUp/skill/${id}`)
};

export function levelDown(id){
    return api.patch(`/usuarios/levelDown/skill/${id}`)
};

export function delUserSkill(id){
    return api.delete(`/usuarios/deletar/skill/${id}`)
};

export function adicionarSkillUser(idUser, idSkill, level){
    return api.post("/usuarios/adicionar/skill", null, {
        params: {
            idUser: idUser,
            idSkill: idSkill,
            level: level
        }
    });
};


//SKILL
export function obterTodasSkills(){
    return api.get("/skills")
};

export function obterTodasSkillsUserNot(userId){
    return api.get(`/skills/skillsUserNot?userId=${userId}`)
};

export function obterSkillPorId(id){
    return api.get(`/skills/${id}`)
};

