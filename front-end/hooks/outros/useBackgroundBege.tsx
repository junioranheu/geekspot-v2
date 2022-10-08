import { useEffect } from 'react';

export default function useBackgroundBege() {

    useEffect(() => {
        document.getElementsByTagName('body')[0]?.classList.add('backgroundBege');
        document.getElementsByClassName('sessaoPrincipal')[0]?.classList.add('backgroundBege');

        // Detectar saída da tela;
        return () => {
            document.getElementsByTagName('body')[0]?.classList.remove('backgroundBege');
            document.getElementsByClassName('sessaoPrincipal')[0]?.classList.remove('backgroundBege');
        };
    }, []);

}