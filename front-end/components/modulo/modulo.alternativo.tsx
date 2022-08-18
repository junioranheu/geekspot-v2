import Image from 'next/image';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import ImgCinza from '../../static/image/outros/cinza.webp';
import Styles from '../../styles/modulo.alternativo.module.scss';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import randomizarArray from '../../utils/outros/randomizarArray';
import ModuloHeader from './modulo.header';

interface iParametros {
    i: number;
    usuarioId: number;
    usuarioNomeSistema: string;
    descricao: string;
    listaItens: {
        nome: string;
        descricao: string;
        imagem: string;
        isAtivo: number;
        itemId: number;
        itemTipoId: number;
        preco: string;
        precoDesconto: string;
        usuarios: {
            usuarioId: number;
            nomeCompleto: string;
        }
    }[];
}

export default function ModuloAlternativo({ i, usuarioId, usuarioNomeSistema, descricao, listaItens }: iParametros) {

    const [listaItensAleatorio, setListaItensAleatorio] = useState<Array<any>>([]);
    useEffect(() => {
        setListaItensAleatorio(randomizarArray(listaItens).slice(0, 4));
    }, [listaItens]);

    return (
        <div className={`flexColumn ${i > 0 && 'margem3_5'}`}>
            <ModuloHeader
                i={i}
                usuarioId={usuarioId}
                usuarioNomeSistema={usuarioNomeSistema}
                descricao={descricao}
            />

            <div className={`${Styles.container} margem1`}>
                {
                    listaItensAleatorio?.map((item, i) => (
                        <div className={Styles.wrapImagem} title={item.nome}>
                            <Image
                                src={(item.imagem ? `${CONSTANTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.imagem}` : ImgCinza)}
                                width={500}
                                height={500}
                                alt=''
                                onClick={() => Router.push(`/item/${item?.itemId}/${ajustarUrl(item?.nome)}`)}
                            />

                            <span>{item.nome}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}