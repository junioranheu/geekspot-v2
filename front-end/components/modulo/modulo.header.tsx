import Router from 'next/router';
import { useEffect, useState } from 'react';
import Styles from '../../styles/modulo.principal.module.scss';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import gerarFraseAleatoria from '../../utils/outros/gerarFraseAleatoria';
import Seta from '../svg/seta';

interface iParametros {
    i: number;
    usuarioId: number;
    usuarioNomeSistema: string;
    descricao: string;
}

export default function ModuloHeader({ i, usuarioId, usuarioNomeSistema, descricao }: iParametros) {

    const [fraseAleatoria, setFraseAleatoria] = useState('');
    useEffect(() => {
        setFraseAleatoria(gerarFraseAleatoria());
    }, [i]);

    return (
        <div className='flexRow'>
            <div className='flexColumn'>
                <b className='titulo cor-principal-hover pointer' onClick={() => Router.push(`/usuario/${usuarioId}/${ajustarUrl(usuarioNomeSistema)}`)}>
                    Itens do usuário @{usuarioNomeSistema}
                </b>

                <span className='texto'>{descricao}</span>
            </div>

            <div className={`${Styles.infoDireita} cor-principal-hover`} onClick={() => Router.push(`/usuario/${usuarioId}/${ajustarUrl(usuarioNomeSistema)}`)}>
                {fraseAleatoria}
                <Seta width='1rem' />
            </div>
        </div>
    )
}