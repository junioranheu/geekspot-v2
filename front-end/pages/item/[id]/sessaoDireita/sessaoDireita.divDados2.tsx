import Styles from './index.module.scss';

export default function DivDados2({ item }: any) {
    return (
        <div className={`${Styles.divDados2} margem1_5 flexColumn`}>
            <div className={`${Styles.texto} flexColumn`}>
                <span>{(item.descricao ?? '-')}</span>
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.divDados2Interna}>
                <div className='flexColumn'>
                    <span>Marca</span>
                    <span>{(item.marca ?? '-')}</span>
                </div>

                <span className='separador'></span>

                <div className='flexColumn'>
                    <span>Condição</span>
                    <span>{(item.condicao ?? '-')}</span>
                </div>

                <span className='separador'></span>

                <div className='flexColumn'>
                    <span>Código</span>
                    <span>{(item.itemId ? `#${item.itemId}` : '-')}</span>
                </div>
            </div>
        </div>
    )
}