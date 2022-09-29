import { ReactNode } from 'react';
import Styles from './styles/topHat.module.scss';

interface iParametros {
    Svg: ReactNode | null;
    titulo: string;
}

export default function TopHat({ Svg, titulo }: iParametros) {
    return (
        <div className={Styles.topHat}>
            {Svg ? Svg : ''}
            <span>{titulo}</span>
        </div>
    )
}