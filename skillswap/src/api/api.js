import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080/api'
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
    return api.post("/usuarios", {login, senha})
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


