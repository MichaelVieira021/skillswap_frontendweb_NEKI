import './styles.css'

export function CardSkill({skill, baixarLevelSkill, deletarSkillUser, aumentarLevelSkill, idSkillUser, level}){
    return(
        <div key={idSkillUser || undefined} id="visualizarSkillUserPorId" style={idSkillUser ? null : {width: "363px", margin: 'auto 0', marginTop: "15px", marginBottom: "35px" }}>
        <div id='boxSkillUserLvl'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={skill.foto} alt="Descrição do SVG" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: "6px", width: "100%", position: 'relative' }}>
            <label style={{ fontWeight: "600", fontSize: "1.05rem" }}>
              {skill.nome}
            </label>

            <label>
              AMP: {skill.tecAmp}%
            </label>

            <label>
              ATK: {skill.atkAdicional}
            </label>

            <label>
              DURAÇÃO: {skill.duracao.toFixed(2)}
            </label>

            {idSkillUser && (
                <p style={{ cursor: 'pointer', position: 'absolute', right: "0rem", top: "0rem", color: 'tomato' }}
                alt="remover"
                onClick={() => deletarSkillUser(skill.id)}
                >X</p>
            )}

            {idSkillUser && (
                <div id="containerLevel">
                    <p>LEVEL</p>
                    <div id="containerBotoesLevel">
                        <button className="botao-diminuir" onClick={() => baixarLevelSkill()}>
                        -
                        </button>
                        <div id="LevelAtualSkillUser">{level} </div>
                        <button className="botao-aumentar" onClick={() => aumentarLevelSkill()}>
                        +
                        </button>
                    </div>
                </div>
            )}

            {!idSkillUser && (
                <div id="containerLevel" style={{ top: 4 }}>
                    <p>LEVEL</p>
                    <div id="LevelAtualSkillUser">1</div>
                </div>
            )}
          </div>
        </div>
      </div>
    )
} 