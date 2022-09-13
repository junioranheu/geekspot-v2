import nProgress from 'nprogress';
import { useEffect, useRef, useState } from 'react';
import { Auth } from '../../utils/context/usuarioContext';
import { default as CONSTS_COMENTARIOS, default as CONSTS_MENSAGENS } from '../../utils/data/constComentarios';
import { Aviso } from '../../utils/outros/aviso';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import iListaComentarios from '../../utils/types/listaComentarios';
import Textarea from '../outros/textarea';
import ComentariosLista from './comentarios.lista';
import Styles from './comentarios.module.scss';

interface iParametros {
    itemId: number;
    usuarioIdDonoItem: number;
}

export default function ComentariosMain({ itemId, usuarioIdDonoItem }: iParametros) {

    const token = Auth?.get()?.token ?? '';
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const maxCaracteres = 200;
    const [texto, setTexto] = useState('');

    const refTextarea = useRef<any>(null);
    const refBtn = useRef<any>(null);

    async function handleEnviar() {
        if (!token) {
            Aviso.warn('Você precisa entrar em sua conta antes de deixar um comentário', 5000);
            return false;
        }

        if (!texto) {
            refTextarea.current.select();
            return false;
        }

        if (usuarioId === usuarioIdDonoItem){
            Aviso.warn('Você não pode comentar no seu próprio item', 5000);
            return false;
        }

        nProgress.start();
        refBtn.current.disabled = true;

        const url = CONSTS_MENSAGENS.API_URL_POST_CRIAR;
        const dto = {
            itemId: itemId,
            usuarioId: 1,
            mensagem: texto,
            resposta: '',
            isAtivo: 1,
            dataEnvio: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        };

        const resposta = await Fetch.postApi(url, dto, token);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            setTexto('');
            refTextarea.current.select();
            refBtn.current.disabled = false;
            Aviso.warn('Houve um problema em enviar seu comentário. Tente novamente mais tarde', 5000);
        }

        nProgress.done();
        setTexto('');
        refBtn.current.disabled = false;
        Aviso.success('Comentário enviado com sucesso', 5000);
    }

    const [comentarios, setComentarios] = useState<iListaComentarios[]>();
    useEffect(() => {
        async function getComentarios(itemId: number) {
            const url = `${CONSTS_COMENTARIOS.API_URL_GET_POR_ITEM_ID}/${itemId}`;
            const comentarios = await Fetch.getApi(url, null) as iListaComentarios[];
            setComentarios(comentarios);
        }

        if (itemId) {
            getComentarios(itemId);
        }
    }, [itemId])

    return (
        <div className={Styles.main}>
            <Textarea
                placeholder='Pergunte ao vendedor'
                height={null}
                max={maxCaracteres}
                texto={texto}
                setTexto={setTexto}
                referenciaTextarea={refTextarea}

                isMostrarBotao={true}
                textoBotao='Perguntar'
                handleFuncaoBotao={handleEnviar}
                referenciaBotao={refBtn}
                isEnabledBotao={true}
            />

            {
                comentarios && (
                    <div className='margem1'>
                        <ComentariosLista listaComentarios={comentarios} maxCaracteres={maxCaracteres} />
                    </div>
                )
            }
        </div>
    )
}