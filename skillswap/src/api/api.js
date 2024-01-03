import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

//CONFIG TOKEN
export const configurarToken = (token) => {
    api.defaults.headers.common['Authorization'] = token;
};



//USER
export function verificarUsuario(email, senha){
    return api.post("/usuarios/login", {email, senha})
};

export function cadastrarUsuario(nomeUsuario, email, senha){
    return api.post("/usuarios", {nomeUsuario, email, senha})
};


