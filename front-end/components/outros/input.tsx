import { Dispatch, Fragment, KeyboardEventHandler, MutableRefObject, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import UUID from '../../utils/outros/UUID';
import Styles from './styles/input.module.scss';

interface iParametros {
    titulo: string;
    placeholder: string | null;
    name: string | null;
    minCaracteres: number;
    tip: string | null;

    handleChange: Dispatch<any> | undefined;
    handleKeyPress: KeyboardEventHandler<HTMLInputElement> | undefined;
    referencia: MutableRefObject<any> | null;
}

export default function Input({ titulo, placeholder, name, minCaracteres, tip, handleChange, handleKeyPress, referencia }: iParametros) {

    const [isExibirIconeErro, setIsExibirIconeErro] = useState(true);
    const [inputControleInterno, setInputControleInterno] = useState('');
    useEffect(() => {
        if (inputControleInterno?.length >= minCaracteres) {
            setIsExibirIconeErro(false);
        } else {
            setIsExibirIconeErro(true);
        }
    }, [inputControleInterno, minCaracteres]);

    return (
        <Fragment>
            <ReactTooltip multiline={true} />

            <div className={Styles.divInput}>
                <div className={Styles.flex}>
                    <span className={Styles.titulo}>{titulo}</span>

                    {
                        minCaracteres > 0 && (
                            isExibirIconeErro ? (
                                <span className={Styles.iconeErro} title='Parece que tem algo errado aqui 👎'>✕</span>
                            ) : (
                                <span className={`${Styles.iconeSucesso} animate__animated animate__headShake`} title='Tudo certo 👍'>✔</span>
                            )
                        )
                    }
                </div>

                <input
                    className='input'
                    type='text'
                    placeholder={placeholder ?? ''}
                    name={name ?? UUID()}
                    autoComplete='new-password'
                    onChange={(e) => { handleChange; setInputControleInterno(e.target.value) }}
                    onKeyPress={handleKeyPress}
                    ref={referencia}
                    data-tip={tip}
                />
            </div>
        </Fragment>
    )
}