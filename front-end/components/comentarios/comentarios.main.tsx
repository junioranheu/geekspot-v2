import { useRef, useState } from 'react';
import Textarea from '../outros/textarea';
import ComentariosLista from './comentarios.lista';
import Styles from './comentarios.module.scss';

export default function ComentariosMain() {

    const [texto, setTexto] = useState('');
    const refTextarea = useRef<any>(null);

    function handleEnviar() {
        refTextarea.current.disabled = true;
        alert('handleEnviar');
    }

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
                textoBotao='Enviar'
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