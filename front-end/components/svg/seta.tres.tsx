import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function SetaTres({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <path d='m11.4997667 11.99975c-.1279958 0-.2559915-.0489969-.3539882-.1459909l-6.6457785-6.64658455-6.64577847 6.64658455c-.19599347.1949879-.51198294.1949879-.7079764 0-.19499351-.1959877-.19499351-.511968 0-.7079557l6.99976667-6.99956254c.19599347-.19498781.51198293-.19498781.7079764 0l6.9997667 6.99956254c.1949935.1959877.1949935.511968 0 .7079557-.0979968.096994-.2259925.1459909-.3539882.1459909' fill='currentColor' fill-rule='evenodd' transform='matrix(0 -1 -1 0 12.5 12.5)'></path>
            {title && <title>{title}</title>}
        </svg>
    )
} 