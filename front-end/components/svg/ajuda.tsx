import Router from 'next/router';

interface iParametros {
    width: number | null
    url: string | null;
}

export default function Ajuda({ width, url }: iParametros) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className='pointer' onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='icon-help' viewBox='0 0 24 24'>
                    <path d='M11.5,1A11.5,11.5,0,0,0,1.56,18.29L0,23.35A.5.5,0,0,0,.67,24L5.4,22.24A11.5,11.5,0,1,0,11.5,1Zm0,22a10.43,10.43,0,0,1-5.76-1.73.5.5,0,0,0-.45-.05l-4,1.47,1.32-4.32A.5.5,0,0,0,2.53,18a10.5,10.5,0,1,1,9,5Z'></path><circle cx='11.5' cy='17' r='1'></circle><path d='M12.13,6.06A3.5,3.5,0,0,0,8,9.5a.5.5,0,0,0,1,0,2.5,2.5,0,1,1,3.13,2.42A1.46,1.46,0,0,0,11,13.32V14.5a.5.5,0,0,0,1,0V13.32a.48.48,0,0,1,.38-.44,3.5,3.5,0,0,0-.25-6.83Z'>
                    </path>
                </symbol>
            </defs>
            &gt;
            <use xlinkHref='#icon-help' fill='#222222'></use>
        </svg>
    )
}