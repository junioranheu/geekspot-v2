import { Dispatch, Fragment, KeyboardEventHandler, MutableRefObject, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import UUID from '../../utils/outros/UUID';
import Styles from './styles/input.module.scss';

interface iParametros {
    titulo: string;
    placeholder: string | null;
    name: string | null;
    tipo: string | null;
    isDisabled: boolean;
    minCaracteres: number;
    dataTip: string | null;
    value: string | null;

    handleChange: Dispatch<any> | undefined;
    handleKeyPress: KeyboardEventHandler<HTMLInputElement> | undefined;
    referencia: MutableRefObject<any> | null;
}

export default function Input({ titulo, placeholder, name, tipo, isDisabled, minCaracteres, dataTip, value, handleChange, handleKeyPress, referencia }: iParametros) {

    const [isExibirIconeErro, setIsExibirIconeErro] = useState(true);
    const [controleInterno, setControleInterno] = useState(value);
    useEffect(() => {
        verificarExibirIconeErro();
    }, []);

    function verificarExibirIconeErro() {
        if (!controleInterno) {
            setIsExibirIconeErro(true);
            return false;
        }

        if (controleInterno?.length >= minCaracteres) {
            setIsExibirIconeErro(false);
        } else {
            setIsExibirIconeErro(true);
        }
    }

    // Controle interno;
    function handleControleInterno(e: any) {
        setControleInterno(e.target.value)
    }

    useEffect(() => {
        verificarExibirIconeErro();
    }, [controleInterno]);

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
                    type={(tipo ?? 'text')}
                    placeholder={(placeholder ?? '')}
                    name={(name ?? UUID())}
                    readOnly={isDisabled} 
                    disabled={isDisabled}
                    autoComplete='new-password'
                    ref={referencia}
                    data-tip={dataTip}
                    value={(value ?? '')}
                    onChange={handleChange}
                    onInput={handleControleInterno}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </Fragment>
    )
}