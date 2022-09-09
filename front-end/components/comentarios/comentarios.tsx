import { useState } from 'react';
import Textarea from '../outros/textarea';
import Styles from './comentarios.module.scss';

export default function Comentarios() {

    const [texto, setTexto] = useState('');

    return (
        <div className={Styles.main}>
            <Textarea
                placeholder='Pergunte ao vendedor'
                height={null}
                max={50}
                texto={texto}
                setTexto={setTexto}
            />
        </div>
    )
}