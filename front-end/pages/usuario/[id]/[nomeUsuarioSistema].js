import { useContext, useEffect, useState } from 'react';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS from '../../../utils/data/constUsuarios';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function Perfil({ usuario }) {
    // console.log(cursos);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        console.log(usuario);
        document.title = usuario ? `GeekSpot — Perfil de @${usuario?.nomeUsuarioSistema}` : 'GeekSpot';

        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [usuarioId, usuario?.nomeUsuarioSistema]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem5'>
            <div className='centralizarTexto'>
                <span className='titulo'>Perfil de <span className='grifar'>@{usuario?.nomeUsuarioSistema}</span></span>
            </div>

            <div className='margem3'>
                Teste
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas os usuários;
    const url = CONSTANTS_USUARIOS.API_URL_GET_TODOS;
    const usuarios = await Fetch.getApi(url, null);

    // Gerar o "paths";
    const paths = usuarios?.map(u => ({
        params: {
            id: u.usuarioId.toString(),
            nomeUsuarioSistema: ajustarUrl(u.nomeUsuarioSistema)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    // Usuário;
    const url = `${CONSTANTS_USUARIOS.API_URL_GET_POR_ID}/${id}`;
    const usuario = await Fetch.getApi(url, null);
    // console.log(usuario);

    return {
        props: {
            usuario
        },
        // revalidate: 10 // segundos
    }
}