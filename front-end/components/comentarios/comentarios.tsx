import { useRef, useState } from 'react';
import Textarea from '../outros/textarea';
import Styles from './comentarios.module.scss';

export default function Comentarios() {

    const [texto, setTexto] = useState('');
    const refTextarea = useRef<any>(null);
    
    function handleEnviar() {
        refTextarea.current.disabled = true;
        alert('handleEnviar');
    }

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
        </div>
    )
}