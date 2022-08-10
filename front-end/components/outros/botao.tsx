import Router from 'next/router';
import { ReactNode, Ref } from 'react';

interface iParametros {
    texto: string;
    url: string | null;
    isNovaAba: boolean;
    Svg: ReactNode;
    refBtn: Ref<any>;
    isEnabled: boolean;
}

export default function Botao({ texto, url, isNovaAba, Svg, refBtn, isEnabled }: iParametros) {
    function abrirUrl() {
        // console.log(isNovaAba);

        if (!url) {
            return false;
        }

        if (isNovaAba) {
            window.open(url, '_blank');
        } else {
            Router.push(url);
        }
    }

    return (
        <button className='botao' onClick={() => abrirUrl()} ref={refBtn} disabled={!isEnabled}>{Svg ? Svg : ''}{texto}</button>
    )
}