import { ChangeEvent, Dispatch } from 'react';
import Styles from './styles/textarea.module.scss';

interface iParametros {
    placeholder: string;
    height: number | null;
    max: number;
    texto: string;
    setTexto: Dispatch<string>;
}

export default function Textarea({ placeholder, height, max, texto, setTexto }: iParametros) {

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setTexto(e.target.value);
    }

    return (
        <div className={Styles.textarea}>
            <textarea
                className='textarea'
                placeholder={placeholder}
                style={(height ? { height: `${height}px` } : {})}
                onChange={(e) => handleChange(e)}
            >
                {texto}
            </textarea>

            <p>111</p>
        </div >
    )
}