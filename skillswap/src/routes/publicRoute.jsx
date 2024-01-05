import { Navigate } from 'react-router-dom';

export function PublicRoute({children}){
    const teste = localStorage.getItem('token')
    return teste == null ? children : <Navigate to="/home"/>
}