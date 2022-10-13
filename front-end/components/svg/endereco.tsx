import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function Endereco({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-endereco' viewBox='0 0 24 24'>
                    <path d='M16 8a4 4 0 1 0 -4 4A4 4 0 0 0 16 8M9 8a3 3 0 1 1 3 3A3 3 0 0 1 9 8'></path><path d='M23.93,22l-2.3-6.66A2,2,0,0,0,19.68,14H18.09A12.69,12.69,0,0,0,19.9,7.9a7.9,7.9,0,0,0-15.8,0,12.91,12.91,0,0,0,2,6.38H4.31a2.05,2.05,0,0,0-1.94,1.34L.09,22a1.46,1.46,0,0,0,.18,1.34A1.55,1.55,0,0,0,1.54,24H22.47a1.55,1.55,0,0,0,1.26-.64A1.46,1.46,0,0,0,23.93,22ZM12,1a6.91,6.91,0,0,1,6.9,6.9c0,5.6-5.8,10.91-6.9,11.56-1.1-.65-6.9-6-6.9-11.56A6.91,6.91,0,0,1,12,1ZM22.92,22.78a.54.54,0,0,1-.45.22H1.54a.54.54,0,0,1-.45-.23A.46.46,0,0,1,1,22.34L3.31,16a1.05,1.05,0,0,1,1-.68H6.7c2,3.07,4.66,5.22,5.3,5.22s3.44-2.3,5.51-5.54a.5.5,0,0,0,.18,0h2a1,1,0,0,1,1,.69L23,22.35A.47.47,0,0,1,22.92,22.78Z'></path>
                </symbol>
            </defs>
            &gt;
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-endereco' fill='currentColor'></use>
        </svg>
    )
}