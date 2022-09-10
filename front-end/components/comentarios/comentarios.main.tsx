import { useEffect, useRef, useState } from 'react';
import CONSTS_COMENTARIOS from '../../utils/data/constComentarios';
import { Fetch } from '../../utils/outros/fetch';
import Textarea from '../outros/textarea';
import ComentariosLista from './comentarios.lista';
import Styles from './comentarios.module.scss';

interface iParametros {
    itemId: number;
}

export default function ComentariosMain({ itemId }: iParametros) {

    const [texto, setTexto] = useState('');
    const refTextarea = useRef<any>(null);

    function handleEnviar() {
        refTextarea.current.disabled = true;
        alert('handleEnviar');
    }

    useEffect(() => {
        async function getComentarios(itemId: number) {
            const url = `${CONSTS_COMENTARIOS.API_URL_GET_POR_ITEM_ID}&itemId=${itemId}`;
            console.log(url);
            const comentarios = await Fetch.getApi(url, null);
            console.log(comentarios);
        }

        if (itemId) {
            getComentarios(itemId);
        }
    }, [itemId])

    const mockComentarios = [
        { id: 1, mensagem: 'Ela é transparente? Vc tem as medidas da calça?', usuario: 'Mariana', data: '08/09/2022', resposta: 'não é transparente não! tecido bem grosso inclusive. não tenho as medidas' },
        { id: 2, mensagem: 'É a mesma calça em todas as fotos?', usuario: 'Sandra', data: '08/09/2022', resposta: 'sim, é a mesma calça :)' }
    ]

    return (
        <div className={Styles.main}>
            <Textarea
                placeholder='Pergunte ao vendedor'
                height={null}
                max={255}
                texto={texto}
                setTexto={setTexto}
                referenciaTextarea={refTextarea}

                isMostrarBotao={true}
                textoBotao='Perguntar'
                handleFuncaoBotao={handleEnviar}
                referenciaBotao={null}
                isEnabledBotao={true}
            />

            <div className='margem1'>
                <ComentariosLista listaComentarios={mockComentarios} />
            </div>
        </div>
    )
}