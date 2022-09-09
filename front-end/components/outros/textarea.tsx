import { ChangeEvent, Dispatch, useState } from 'react';
import Styles from './styles/textarea.module.scss';

interface iParametros {
    placeholder: string;
    height: number | null;
    max: number;
    texto: string;
    setTexto: Dispatch<string>;
}

export default function Textarea({ placeholder, height, max, texto, setTexto }: iParametros) {

    const [qtdCaracteresRestantes, setQtdCaracteresRestantes] = useState(max);
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const verificarQtdCaracteresRestantes = max - e.target.value.length;

        if (verificarQtdCaracteresRestantes < 0) {
            return false;
        }

        setQtdCaracteresRestantes(verificarQtdCaracteresRestantes);
        setTexto(e.target.value);
    }

    return (
        <div className={Styles.textarea}>
            <textarea
                className='textarea'
                placeholder={placeholder}
                style={(height ? { height: `${height}px` } : {})}
                onChange={(e) => handleChange(e)}
                value={texto}
            >
            </textarea>

            <div className={Styles.contador}>
                {qtdCaracteresRestantes}
            </div>
        </div>
    )
}