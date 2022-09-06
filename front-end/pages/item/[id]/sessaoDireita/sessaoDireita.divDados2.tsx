import { Fragment } from 'react';
import pad from '../../../../utils/outros/pad';
import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';

export default function DivDados2({ item }: iItem) {
    return (
        <div className={`${Styles.divDados2} margem1_5 flexColumn`}>
            {
                item.descricao && (
                    <Fragment>
                        <div className={`${Styles.texto} flexColumn`}>
                            <span>{(item.descricao ?? '-')}</span>
                        </div>

                        <span className='separadorHorizontal'></span>
                    </Fragment>
                )
            }

            <div className={Styles.divDados2Interna}>
                <div className='flexColumn'>
                    <span>Marca</span>
                    <span>{(item?.marca ?? '-')}</span>
                </div>

                <span className='separador'></span>

                <div className='flexColumn'>
                    <span>Condição</span>
                    <span>{(item?.condicao ?? '-')}</span>
                </div>

                <span className='separador'></span>

                <div className='flexColumn'>
                    <span>Código</span>
                    <span>{(item.itemId ? `#${pad(item?.itemId.toString(), 7, '0')}` : '-')}</span>
                </div>
            </div>
        </div>
    )
}