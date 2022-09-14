import Image from 'next/image';
import Router from 'next/router';
import { Fragment, useState } from 'react';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import { Auth } from '../../utils/context/usuarioContext';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import formatarData from '../../utils/outros/formatarData';
import limitarTexto from '../../utils/outros/limitarTexto';
import iListaComentarios from '../../utils/types/listaComentarios';
import ModalResponderComentario from '../modal/modal.comentario/responder';
import ModalLayout from '../modal/_modal.layout';
import ModalWrapper from '../modal/_modal.wrapper';
import Styles from './comentarios.module.scss';

interface iParametros {
    id: number | null; // Concernente ao id em questão. Ex: comentário, usuário, etc;
    isExibirOpcaoResponder: boolean;
    listaComentarios: iListaComentarios[];
    maxCaracteres: number;
}

export default function ComentariosLista({ id, isExibirOpcaoResponder, listaComentarios, maxCaracteres }: iParametros) {

    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [isModalResponderComentarioOpen, setIsModalResponderComentarioOpen] = useState(false);
    const [comentarioClicadoParaResponder, setComentarioClicadoParaResponder] = useState<any>();
    function handleResponderComentario(item: any) {
        setComentarioClicadoParaResponder(item);
        setIsModalResponderComentarioOpen(true)
    }

    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalResponderComentarioOpen} >
                <ModalLayout handleModal={() => setIsModalResponderComentarioOpen(!isModalResponderComentarioOpen)} isExibirApenasLogo={true} titulo={null} tamanho='' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalResponderComentario handleModal={() => setIsModalResponderComentarioOpen(!isModalResponderComentarioOpen)} dados={comentarioClicadoParaResponder} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <div className={Styles.mainLista}>
                <span className={Styles.texto}>Últimas perguntas</span>

                {
                    listaComentarios.length > 0 ? (
                        listaComentarios?.slice(0, 100).map((item, i: number) => (
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
                                        <span className={`${Styles.perguntaInfo} ${Styles.margem0_2}`}>@{item?.usuarios?.nomeUsuarioSistema}, {formatarData(item?.dataEnvio, 2).toLocaleLowerCase()}</span>
                                    </div>

                                    {
                                        // Se o comentário ainda não tem uma resposta && se "id concernente" (#id) é o usuário logado (#usuarioId);
                                        (!item?.resposta) && (id === usuarioId) && (isExibirOpcaoResponder) && (
                                            <div>
                                                <span
                                                    className={`${Styles.perguntaInfo} cor-principal-hover pointer`}
                                                    title={`Responder comentário do usuário @${item?.usuarios?.nomeUsuarioSistema}`}
                                                    onClick={() => handleResponderComentario(item)}
                                                >
                                                    Responder
                                                </span>
                                            </div>
                                        )
                                    }
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
        </Fragment>
    )
}