import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';

export default function DivOwner({ item }: iItem) {
    return (
        <div className={`${Styles.divOwner} margem1_5 flexColumn`}>
            <span className='separadorHorizontal'></span>
            <span>SVG DE SEGURANÇA AQUI</span>
        </div>
    )
}