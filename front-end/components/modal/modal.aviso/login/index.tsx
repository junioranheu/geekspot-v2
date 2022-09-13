import { Dispatch } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
}

export default function ModalAvisoLogin({ handleModal }: iParametros) {
    return (
        <div className={Styles.main}>
            <h1>teste</h1>
        </div>
    )
}