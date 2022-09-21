import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Botao from '../components/outros/botao';
import Styles from '../styles/404.module.scss';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';
import Lottie404 from '../utils/lotties/404.json';
import paginaCarregada from '../utils/outros/paginaCarregada';

export default function Erro() {
    document.title = `404 — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
    const router = useRouter();

    const [isLoaded, setIsLoaded] = useState(false);
    const [msg, setMsg] = useState('');
    useEffect(() => {
        function verificarMsg(msgErro: string) {
            // console.log(msgErro);
            setMsg(msgErro);
        }

        console.log(router.query.erro);
        if (router.query.erro) {
            verificarMsg(router.query.erro.toString());
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
                <span className={`${Styles.texto} margem2`}>Parece que algo deu errado por aqui<br />{msg}</span>

                <div className='margem2'>
                    <Botao texto='Voltar ao início' url='/' isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                </div>
            </div>
        </section>
    )
}