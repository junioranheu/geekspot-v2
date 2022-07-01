import Router from 'next/router';

export default function Botao({ texto, url, isNovaAba, Svg, refBtn, isEnabled }) {
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