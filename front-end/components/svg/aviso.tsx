import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function AvisoSvg({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-aviso' viewBox='0 0 24 24'>
                    <path d='M23.82,20.91,13.57,1.68a1.22,1.22,0,0,0-2.15,0L1.18,20.91a1.5,1.5,0,0,0,0,1.38,1.22,1.22,0,0,0,1.09.7h20.5a1.22,1.22,0,0,0,1.09-.7h0A1.5,1.5,0,0,0,23.82,20.91Zm-.88.93a.24.24,0,0,1-.2.15H2.25a.24.24,0,0,1-.2-.15.5.5,0,0,1,0-.46L12.31,2.15c.05-.1.12-.15.19-.15s.14,0,.19.15L22.94,21.38A.5.5,0,0,1,22.95,21.85Z'></path>
                    <path d='M12.5,15a.5.5,0,0,0,.5-.5v-5a.5.5,0,0,0-1,0v5A.5.5,0,0,0,12.5,15Z'></path>
                    <circle cx='12.5' cy='17' r='1'></circle>
                </symbol>
            </defs>
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-aviso' fill='currentColor'></use>
        </svg>
    )
}