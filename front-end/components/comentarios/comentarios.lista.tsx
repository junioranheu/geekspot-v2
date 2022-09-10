import Image from 'next/image';
import Router from 'next/router';
import { Fragment } from 'react';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/data/constUpload';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import formatarData from '../../utils/outros/formatarData';
import limitarTexto from '../../utils/outros/limitarTexto';
import iListaComentarios from '../../utils/types/listaComentarios';
import Styles from './comentarios.module.scss';

interface iParametros {
    listaComentarios: iListaComentarios[];
    maxCaracteres: number;
}

export default function ComentariosLista({ listaComentarios, maxCaracteres }: iParametros) {
    return (
        <div className={Styles.mainLista}>
            <span className={Styles.texto}>Últimas perguntas</span>

            {
                listaComentarios.length > 0 ? (
                    listaComentarios?.map((item, i: number) => (
                        <div className={`${Styles.perguntaDiv} margem1_5`} key={i}>
                            <div className={Styles.flexRow}>
                                <div className={`${Styles.divImg} pointer`} title={`Ir para o perfil de @${item?.usuarios?.nomeUsuarioSistema}`} onClick={() => Router.push(`/usuario/${item?.usuarioId}/${ajustarUrl(item?.usuarios?.nomeUsuarioSistema)}`)}>
                                    <Image
                                        src={(item?.usuarios?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${item?.usuarios?.foto}` : ImgCinza)}
                                        width={30}
                                        height={30}
                                        alt=''
                                    />
                                </div>

                                <div className='flexColumn'>
                                    <span className={Styles.perguntaTexto}>{limitarTexto(item?.mensagem, maxCaracteres)}</span>
                                    <span className={Styles.perguntaInfo}>@{item?.usuarios?.nomeUsuarioSistema}, {formatarData(item?.dataEnvio, 2).toLocaleLowerCase()}</span>
                                </div>
                            </div>

                            {
                                item?.resposta && (
                                    <Fragment>
                                        <div className={Styles.conector}></div>

                                        <div className={Styles.flexRow}>
                                            <div className={`${Styles.divImg} pointer`} title={`Ir para o perfil de @${item?.itens?.usuarios?.nomeUsuarioSistema}`} onClick={() => Router.push(`/usuario/${item?.itens?.usuarios?.usuarioId}/${ajustarUrl(item?.itens?.usuarios?.nomeUsuarioSistema)}`)}>
                                                <Image
                                                    src={(item?.itens?.usuarios?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${item?.itens?.usuarios?.foto}` : ImgCinza)}
                                                    width={30}
                                                    height={30}
                                                    alt=''
                                                />
                                            </div>

                                            <span className={Styles.perguntaResposta}>{limitarTexto(item?.resposta, maxCaracteres)}</span>
                                        </div>
                                    </Fragment>
                                )
                            }
                        </div>
                    ))
                ) : (
                    <span className={Styles.textoPequeno}>Este produto ainda não recebeu nenhum comentário</span>
                )
            }
        </div>
    )
}