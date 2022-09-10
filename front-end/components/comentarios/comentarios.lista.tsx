import Image from 'next/image';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/data/constUpload';
import formatarData from '../../utils/outros/formatarData';
import iListaComentarios from '../../utils/types/listaComentarios';
import Styles from './comentarios.module.scss';

interface iParametros {
    listaComentarios: iListaComentarios[];
}

export default function ComentariosLista({ listaComentarios }: iParametros) {
    return (
        <div className={Styles.mainLista}>
            <span className={Styles.texto}>Últimas perguntas</span>

            {
                listaComentarios.length > 0 ? (
                    listaComentarios?.map((item, i: number) => (
                        <div className={`${Styles.perguntaDiv} margem1_5`} key={i}>
                            <div className={Styles.flexRow}>
                                <div>
                                    <Image
                                        src={(item?.usuarios?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${item?.usuarios?.foto}` : ImgCinza)}
                                        width={30}
                                        height={30}
                                        alt=''
                                    />
                                </div>

                                <div className='flexColumn'>
                                    <span className={Styles.perguntaTexto}>{item?.mensagem}</span>
                                    <span className={Styles.perguntaInfo}>@{item?.usuarios?.nomeUsuarioSistema}, {formatarData(item?.dataEnvio, 2).toLocaleLowerCase()}</span>
                                </div>
                            </div>

                            {
                                item?.resposta && (
                                    <div className={Styles.flexRow}>
                                        <Image
                                            src={(item?.itens?.usuarios?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${item?.itens?.usuarios?.foto}` : ImgCinza)}
                                            width={30}
                                            height={30}
                                            alt=''
                                        />

                                        <span className={Styles.perguntaResposta}>{item?.resposta}</span>
                                    </div>
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