import './styles.css';
import { GiCrownedSkull } from "react-icons/gi";

export const InputLogin = (props) => {

    const stylePadrao = {
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        position: 'relative',
    };

    const juntarStyles = {...stylePadrao,...props.style};

    return (
        <div id='inputLogin' style={juntarStyles} >
            <GiCrownedSkull
                style={{
                    width: '40px',
                    position: 'absolute',
                    left: '-6px',
                    top: '7%',
                    color: 'gray',
                    fontSize: 25
                }}
            />

            <input
                type="text"
                placeholder={props.placeholder}
                onChange={(e) => props.setLogin(e.target.value)}
                value={props.login}
            />

        </div>
    )
}