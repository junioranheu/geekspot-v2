import { useEffect, useRef, useState } from 'react';
import CONSTS_COMENTARIOS from '../../utils/data/constComentarios';
import { Fetch } from '../../utils/outros/fetch';
import iListaComentarios from '../../utils/types/listaComentarios';
import Textarea from '../outros/textarea';
import ComentariosLista from './comentarios.lista';
import Styles from './comentarios.module.scss';

interface iParametros {
    itemId: number;
}

export default function ComentariosMain({ itemId }: iParametros) {

    const maxCaracteres = 200;
    const [texto, setTexto] = useState('');
    const refTextarea = useRef<any>(null);

    function handleEnviar() {
        refTextarea.current.disabled = true;
        alert('handleEnviar');
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
                referenciaBotao={null}
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