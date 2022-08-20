import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Botao from '../components/outros/botao';
import Styles from '../styles/404.module.scss';
import Lottie404 from '../utils/lotties/404.json';
import paginaCarregada from '../utils/outros/paginaCarregada';

export default function Erro() {
    document.title = 'GeekSpot — 404';
    const router = useRouter();

    const [isLoaded, setIsLoaded] = useState(false);
    const [msg, setMsg] = useState('');
    useEffect(() => {
        function verificarMsg(msg: string) {
            // console.log(msg);
            let msgFinal = '';

            if (msg === 'sem-acesso') {
                msgFinal = 'Você não está autenticado ou não tem permissão para executar a ação requisitada';
            } else if (msg === 'autenticado') {
                msgFinal = 'Você já está autenticado, portanto não pode mais executar a ação requisitada';
            }

            setMsg(msgFinal);
        }

        if (router.query.msg) {
            verificarMsg(router.query.msg.toString());
        } else {
            setMsg('Tente novamente mais tarde');
        }

        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [router]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={`${Styles.wrapper} paddingPadrao`}>
            <div>
                <div className={Styles.divLottie}>
                    <Lottie animationData={Lottie404} loop={true} />
                </div>
            </div>

            <div>
                <span className={Styles.titulo}>Opa...</span>
                <span className='texto margem2'>Parece que algo deu errado por aqui<br />{msg}</span>

                <div className='margem2'>
                    <Botao texto='Voltar ao início' url='/' isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                </div>
            </div>
        </section>
    )
}