import './styles.css';
import { useState } from "react"
import { GiBleedingEye } from "react-icons/gi";
import { FaEyeSlash } from "react-icons/fa";
import { GiSkeletonKey } from "react-icons/gi";

export const InputSenha = (props) => {
    const [verSenha, setVerSenha] = useState(false)

    return(
        <div id='inputSenha2' >
            <GiSkeletonKey
                style={{ 
                    width: '40px', 
                    position: 'absolute', 
                    left: '-6px', 
                    top: '7%', 
                    color: 'gray',
                    fontSize: 25,
                }}
            />

            <input 
                type={verSenha ? "text" : "password"}
                placeholder={props.placeholder} 
                onChange={(e) => props.setSenha(e.target.value)}
                value={props.senha}
            />

            <div
                style={{
                    position: 'absolute',
                    top: '18%',
                    right: '6px',
                    cursor: 'pointer',
                    color: 'gray',
                }}
                onClick={()=> setVerSenha(!verSenha)}
            >
              {verSenha ? <GiBleedingEye /> : <FaEyeSlash />}
            </div>
        </div>
    )
}