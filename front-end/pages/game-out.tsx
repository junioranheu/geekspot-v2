import { useState } from 'react';
import Typewriter from 'typewriter-effect'; // https://www.npmjs.com/package/typewriter-effect
import Botao from '../components/outros/botao';
import Styles from '../styles/gameout.module.scss';

export default function GameOut() {
    document.title = 'GameOut, o GeekSpot em 2017';

    const [isMostrarBotao, setIsMostrarBotao] = useState(false);
    const msg = 'O GeekSpot nasceu em 2016. 🍼<br/><br/>Infelizmente não podemos vê-lo novamente, com sua cara original de 2016. 😥<br/><br/>Todos seus vestígios foram apagados da face da Terra. 😧<br/><br/>Mas ele ganhou um novo nome, e uma nova retocada em sua cara, em 2017. 🤠<br/><br/>Nessa época seu nome era GameOut. 🤓<br/><br/>Agora, em 2022, retornou das cinzas, com seu nome original, GeekSpot 😎<br/><br/>Veja abaixo como era o GeekSpot em 2017:';

    return (
        <main className={`${Styles.wrapper} paddingPadrao`}>
            <div className={Styles.divType}>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(msg)
                            .pauseFor(1000)
                            // .deleteAll()
                            .callFunction(() => {
                                // console.log('Fim do processo');
                                setIsMostrarBotao(true);
                            })
                            .start();
                    }}

                    options={{
                        delay: 80,
                    }}
                />
            </div>

            {
                isMostrarBotao && (
                    <div className='margem2 animate__animated animate__fadeIn'>
                        <Botao texto='Ver o GeekSpot de 2017' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                )
            }
        </main>
    )
}

