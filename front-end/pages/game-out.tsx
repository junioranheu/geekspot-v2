import { Fragment, useState } from 'react';
import Typewriter from 'typewriter-effect'; // https://www.npmjs.com/package/typewriter-effect
import Botao from '../components/outros/botao';
import Styles from '../styles/gameout.module.scss';

export default function GameOut() {
    
    document.title = 'GameOut, o GeekSpot em 2017';

    const [isMostrarBotao, setIsMostrarBotao] = useState(false);
    const nomeSistema = '<span class="cor-principal">GeekSpot</span>';
    const [isMostrarPrint, setIsMostrarPrint] = useState(false);

    return (
        <Fragment>
            {
                !isMostrarPrint ? (
                    <section className={`${Styles.wrapper} paddingPadrao`}>
                        <div className={Styles.divType}>
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString(`O ${nomeSistema} nasceu em 2016. 🍼<br/><br/>PS: O ${nomeSistema} ganhou um novo nome, e uma nova retocada em sua cara, em 2017: <span class="cor-principal">GameOut</span>.`)
                                        .pauseFor(1000)
                                        .deleteAll()
                                        .typeString(`Agora, em 2022, retornou das cinzas, com seu nome original, ${nomeSistema} 😎<br/><br/>Veja abaixo como era o ${nomeSistema} em 2017:`)
                                        .pauseFor(1000)
                                        .callFunction(() => {
                                            // console.log('Fim do processo');
                                            setIsMostrarBotao(true);
                                        })
                                        .start();
                                }}

                                options={{
                                    delay: 80,
                                    deleteSpeed: 1
                                }}
                            />
                        </div>

                        {
                            isMostrarBotao && (
                                <div className='margem2 animate__animated animate__fadeIn'>
                                    <Botao texto='Ver o GeekSpot de 2017' url={null} isNovaAba={false} handleFuncao={() => setIsMostrarPrint(true)} Svg={null} refBtn={null} isEnabled={true} />
                                </div>
                            )
                        }
                    </section>
                ) : (
                    <div className={`${Styles.backgroundFull} animate__animated animate__fadeIn`}></div>
                )
            }
        </Fragment>
    )
}

