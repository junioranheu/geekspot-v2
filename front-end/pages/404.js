import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Botao from '../components/outros/botao';
import Styles from '../styles/404.module.css';
import paginaCarregada from '../utils/outros/paginaCarregada';

export default function Erro() {
    document.title = 'GeekSpot — 404';
    const router = useRouter();
 
    const [isLoaded, setIsLoaded] = useState(false);
    const [msg, setMsg] = useState(null);
    useEffect(() => {
        function verificarMsg(msg) {
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
            verificarMsg(router.query.msg);
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
            <span className='titulo'>Opa...</span>
            <span className='tituloDesc margem10'>Parece que algo deu errado<br />{msg}</span>

            <div className='margem50'>
                <Botao texto='Voltar ao início' url={'/'} isNovaAba={false} Svg={null} refBtn={null} isEnabled={true} />
            </div>
        </section>
    )
}