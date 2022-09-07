import { Dispatch } from 'react';
import { StorageModoDark } from '../../utils/context/modoDarkContext';

export default function alterarModo(isModoDark: boolean | undefined | null, setIsModoDark: Dispatch<any>) {
    // console.log(isModoDark);

    if (isModoDark === true) {
        // console.log('Ativar modo dark'); 
        document.documentElement.style.setProperty('--preto', '#FFFFFF'); // Preto fica branco;
        document.documentElement.style.setProperty('--super-preto', '#f4f2f0'); // Super preto fica bege;
        document.documentElement.style.setProperty('--branco', '#1A1A1A'); // Branco fica preto;
        document.documentElement.style.setProperty('--cinza', '#F2F2F2'); // Cinza fica creme acinzentado;
        document.documentElement.style.setProperty('--cinza-secundario', '#f4f2f0'); // Cinza escuro fica bege;  
        document.documentElement.style.setProperty('--cor-border-hr', 'rgba(255, 255, 255, 10%)'); // Cinza "apagado" para branco "apagado";
        document.documentElement.style.setProperty('--bege', '#000000'); // Bege fica super preto;

        // Atualizar no localStorage;
        setIsModoDark(isModoDark);
        StorageModoDark.update({ isModoDark: isModoDark });
    } else if (isModoDark === false) {
        // console.log('Ativar modo light');
        document.documentElement.style.setProperty('--preto', '#1A1A1A');
        document.documentElement.style.setProperty('--super-preto', '#000000');
        document.documentElement.style.setProperty('--branco', '#FFFFFF');
        document.documentElement.style.setProperty('--cinza', '#313131');
        document.documentElement.style.setProperty('--cinza-secundario', '#242424');
        document.documentElement.style.setProperty('--cor-border-hr', 'rgba(42, 42, 42, 10%)');
        document.documentElement.style.setProperty('--bege', '#f4f2f0');
        
        // Atualizar no localStorage;
        setIsModoDark(isModoDark);
        StorageModoDark.update({ isModoDark: isModoDark });
    }
}