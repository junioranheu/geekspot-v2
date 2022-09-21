import { Fragment } from 'react';
import ComentariosMain from '../../../../components/comentarios/comentarios.main';
import useWindowSize from '../../../../hooks/outros/useWindowSize';
import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';
import DivAvisoProtecao from './sessaoDireita.divAvisoProtecao';
import DivBotoes from './sessaoDireita.divBotoes';
import DivDados1 from './sessaoDireita.divDados1';
import DivDados2 from './sessaoDireita.divDados2';
import DivOwner from './sessaoDireita.divOwner';

interface iParametros {
    item: iItem;
}

export default function SessaoDireita({ item }: iParametros) {

    const tamanhoTela = useWindowSize();

    return (
        <div className={Styles.sessaoDireita}>
            <span className={Styles.textoCinza}>{item?.itensTipos?.tipo}</span>
            <span className='titulo'>{item?.nome}</span>

            <DivDados1 item={item} />
            <DivBotoes item={item} />
            <DivDados2 item={item} />
            <DivAvisoProtecao />
            <DivOwner item={item} />

            {/* 
                ComentariosMain: Div com input para comentar e lista de comentários;
                Se o width for maior ou igual a 600 fica em /item/[id]/sessaoDireita/index.tsx;
                Se o width for menor que 600px fica em /item/[id]/sessaoEsquerda/index.tsx;
            */}
            {
                tamanhoTela.width && tamanhoTela?.width < 600 && (
                    <Fragment>
                        <span className='separadorHorizontal'></span>

                        <div className={Styles.divComentarios}>
                            <ComentariosMain itemId={item?.itemId} usuarioIdDonoItem={item?.usuarioId} />
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}

