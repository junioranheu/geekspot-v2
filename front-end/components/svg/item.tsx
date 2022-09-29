import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function Item({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='icon-bag' viewBox='0 0 24 24'>
                    <path d='M23.88,8.17A.5.5,0,0,0,23.5,8H18V6A6,6,0,0,0,6,6V8H.5a.5.5,0,0,0-.5.57L1.65,21a3.49,3.49,0,0,0,3.44,3H18.9a3.51,3.51,0,0,0,3.45-3.05L24,8.57A.5.5,0,0,0,23.88,8.17ZM7,6A5,5,0,0,1,17,6V8H7ZM21.36,20.81A2.51,2.51,0,0,1,18.9,23H5.08a2.49,2.49,0,0,1-2.44-2.17L1.07,9H6v2.5a.5.5,0,0,0,1,0V9H17v2.5a.5.5,0,0,0,1,0V9h4.93Z'></path>
                </symbol>
            </defs>
            &gt;
            {title && <title>{title}</title>}
            <use xlinkHref='#icon-bag' fill='currentColor'>
            </use>
        </svg>
    )
}