import Image from 'next/image';
import { useState } from 'react';
import Zoom from 'react-medium-image-zoom'; // https://www.npmjs.com/package/react-medium-image-zoom
import 'react-medium-image-zoom/dist/styles.css';
import ComentariosMain from '../../../../components/comentarios/comentarios.main';
import useWindowSize from '../../../../hooks/outros/useWindowSize';
import ImgCinza from '../../../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../../../utils/consts/data/constUpload';
import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';

export default function SessaoEsquerda({ item }: iItem) {

    const tamanhoTela = useWindowSize();

    // @ts-ignore;
    const [imagemSelecionada, setImagemSelecionada] = useState<string>(item?.itensImagens?.find((x: any) => x.isAtivo)?.caminhoImagem);

    return (
        <div className={Styles.sessaoEsquerda}>
            <div className={Styles.cursorDiferente}>
                <Zoom>
                    <Image
                        src={(imagemSelecionada ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${imagemSelecionada}` : ImgCinza)}
                        width={500}
                        height={500}
                        alt=''
                        className={Styles.efeitoImagemHover}
                        title={`Visualizar ${item.nome.toLowerCase()}`}
                    />
                </Zoom>
            </div>

            {/* Lista de imagens */}
            {
                item?.itensImagens && item?.itensImagens?.length > 1 && (
                    <div className={`${Styles.divListaImagens} margem0_5`}>
                        {
                            item.itensImagens?.map((item: any, i: number) => (
                                <div className={Styles.divListaImagensWrapper} key={i}>
                                    <Image
                                        src={(item.caminhoImagem ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.caminhoImagem}` : ImgCinza)}
                                        width={60}
                                        height={60}
                                        alt=''
                                        onClick={() => setImagemSelecionada(item?.caminhoImagem)}
                                    />

                                    {
                                        // Efeito de imagem selecionada;
                                        imagemSelecionada === item?.caminhoImagem && (
                                            <div className={Styles.efeitoImagemSelecionada}></div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {/* 
                ComentariosMain: Div com input para comentar e lista de comentários;
                Se o width for maior ou igual a 600 fica em /item/[id]/sessaoDireita/index.tsx;
                Se o width for menor que 600px fica em /item/[id]/sessaoEsquerda/index.tsx;
            */}
            {
                tamanhoTela.width && tamanhoTela?.width >= 600 && (
                    <div className={Styles.divComentarios}>
                        <div className='margem1_5'></div>
                        <ComentariosMain itemId={item?.itemId} usuarioIdDonoItem={item?.usuarioId} />
                    </div>
                )
            }
        </div>
    )
}

