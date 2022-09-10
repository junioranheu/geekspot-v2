import Image from 'next/image';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/data/constUpload';
import Styles from './comentarios.module.scss';

interface iParametros {
    listaComentarios: Array<any>;
}

export default function ComentariosLista({ listaComentarios }: iParametros) {
    return (
        <div className={Styles.mainLista}>
            <span className={Styles.texto}>Últimas perguntas</span>

            {
                listaComentarios?.length > 0 ? (
                    listaComentarios?.map((item, i: number) => (
                        <div className={`${Styles.perguntaDiv} margem1_5`} key={i}>
                            <div className={Styles.flexRow}>
                                <div>
                                    <Image
                                        src={(item?.usuarioPergunta?.foto ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item?.usuarioPergunta?.foto}` : ImgCinza)}
                                        width={30}
                                        height={30}
                                        alt=''
                                    />
                                </div>

                                <div className='flexColumn'>
                                    <span className={Styles.perguntaTexto}>{item?.mensagem}</span>
                                    <span className={`${Styles.perguntaInfo} ${Styles.margem0_2}`}>{item?.usuario}, {item?.data}</span>
                                </div>
                            </div>

                            <div className={Styles.flexRow}>
                                <Image
                                    src={(item?.usuarioDonoProduto?.foto ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item?.usuarioPergunta?.foto}` : ImgCinza)}
                                    width={30}
                                    height={30}
                                    alt=''
                                />

                                <span className={Styles.perguntaResposta}>{item?.resposta}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className={Styles.textoPequeno}>Este produto ainda não recebeu nenhum comentário</span>
                )
            }
        </div>
    )
}