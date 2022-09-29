import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function Loja({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-loja' viewBox='0 0 24 24'>
                    <path d='M23,9,21.07,1.5A2,2,0,0,0,19.14,0H3.86A2,2,0,0,0,1.93,1.5L0,8.88,0,9a2.88,2.88,0,0,0,1,2.16V22a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V11.16A2.88,2.88,0,0,0,23,9ZM20.11,1.75,22,9.06A2.15,2.15,0,0,1,19.75,11,2.14,2.14,0,0,1,17.5,9h0s0,0,0-.06L16.53,1h2.61A1,1,0,0,1,20.11,1.75ZM7.6,1H11V9a2.14,2.14,0,0,1-2.25,2A2.14,2.14,0,0,1,6.5,9.07ZM12,1h3.53l1,8a2.14,2.14,0,0,1-2.25,2A2.14,2.14,0,0,1,12,9Zm-9.11.75a1,1,0,0,1,1-.75H6.6L5.5,9a2.14,2.14,0,0,1-2.25,2A2.15,2.15,0,0,1,1,9.06ZM20,23H3a1,1,0,0,1-1-1V19H21v3A1,1,0,0,1,20,23Zm1-5H2V11.77A3.46,3.46,0,0,0,3.25,12,3.31,3.31,0,0,0,6,10.58a3.37,3.37,0,0,0,5.5,0,3.36,3.36,0,0,0,5.49,0A3.31,3.31,0,0,0,19.75,12,3.46,3.46,0,0,0,21,11.77Z'></path>
                </symbol>
            </defs>
            &gt;
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-loja' fill='currentColor'>
            </use>
        </svg>
    )
} 