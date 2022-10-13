import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function CartaoCredito({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-cartaoCredito' viewBox='0 0 24 24'>
                    <path d='M22,3H2A2,2,0,0,0,0,5V19a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V5A2,2,0,0,0,22,3ZM2,4H22a1,1,0,0,1,1,1V7H1V5A1,1,0,0,1,2,4Zm21,6H1V8H23ZM22,20H2a1,1,0,0,1-1-1V11H23v8A1,1,0,0,1,22,20Z'></path><path d='M9.5,15h-6a.5.5,0,0,0,0,1h6a.5.5,0,0,0,0-1Z'></path><path d='M19,13H18a2,2,0,0,0-2,2v1a2,2,0,0,0,2,2h1a2,2,0,0,0,2-2V15A2,2,0,0,0,19,13Zm1,3a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V15a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1Z'>
                    </path>
                </symbol>
            </defs>
            &gt;
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-cartaoCredito' fill='currentColor'></use>
        </svg>
    )
}