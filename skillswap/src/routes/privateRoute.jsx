import { Navigate} from 'react-router-dom';

export function PrivateRoute({children}){
    const teste = localStorage.getItem('token')
    return teste != null ? children : <Navigate to="/login"/>
}