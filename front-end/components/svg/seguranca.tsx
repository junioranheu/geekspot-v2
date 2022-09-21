import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function Seguranca({ width, url, title }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className='pointer' onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-seguranca' viewBox='0 0 24 24'>
                    <path d='M24,4.22h0a1.46,1.46,0,0,0-1.46-1.36c-3.73,0-7.41-1-9.62-2.58a1.46,1.46,0,0,0-1.71,0C8.56,2.18,4.45,2.86,1.48,2.86A1.46,1.46,0,0,0,0,4.22c0,.16-.86,15.57,11.51,19.7A1.44,1.44,0,0,0,12,24a1.42,1.42,0,0,0,.46-.07C24.84,19.82,24,4.38,24,4.22ZM12.14,23a.45.45,0,0,1-.29,0C.23,19.09,1,4.43,1,4.29a.46.46,0,0,1,.46-.43c3.13,0,7.48-.73,10.31-2.77a.46.46,0,0,1,.54,0c2.37,1.71,6.28,2.77,10.2,2.77a.46.46,0,0,1,.46.43C23,4.45,23.77,19.12,12.14,23Z'></path><path d='M15,10V8A3,3,0,0,0,9,8v2a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V12A2,2,0,0,0,15,10ZM10,8a2,2,0,0,1,4,0v2H10Zm6,7a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z' fill='currentColor'></path>
                </symbol>
            </defs>
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-seguranca' fill='#7D7A77'></use>
        </svg>
    )
}