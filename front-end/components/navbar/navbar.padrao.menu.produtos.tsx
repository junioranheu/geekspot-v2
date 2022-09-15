import { Dispatch } from 'react';

interface iParametros {
    isExibirPainelNavbarPadrao: boolean;
    setIsExibirPainelNavbarPadrao: Dispatch<boolean>;
    debounceFecharPainelNavbarPadrao: { (this: unknown, ...args: [] & any[]): Promise<void>; cancel: (reason?: any) => void; }; // debounce;
}

export default function NavbarPadraoDivMenuProdutos({ isExibirPainelNavbarPadrao, setIsExibirPainelNavbarPadrao, debounceFecharPainelNavbarPadrao }: iParametros) {

    function abrirPainelNavbarPadrao() {
        setIsExibirPainelNavbarPadrao(true);
        debounceFecharPainelNavbarPadrao.cancel();
    }

    return (
        <div>
            <h1>aea</h1>
        </div>
    )
}