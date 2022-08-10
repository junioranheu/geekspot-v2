import { createContext, useState } from 'react';

interface iContext {
    isModoDarkContext: [isModoDark: boolean, setIsModoDark: any];
    testeContext: [teste: boolean, setTeste: any];
}

export const ModoDarkContext = createContext<iContext | null>(null);

export const ModoDarkProvider = (props: any) => {
    const [isModoDark, setIsModoDark] = useState(localStorage.getItem('modoDark') !== null ? true : false);
    const [teste, setTeste] = useState(true);

    return (
        <ModoDarkContext.Provider value={{
            isModoDarkContext: [isModoDark, setIsModoDark],
            testeContext: [teste, setTeste]
        }}>
            {props.children}
        </ModoDarkContext.Provider>
    );
}

export const StorageModoDark = {
    set(data: any) {
        const dados = {
            isModoDark: data.isModoDark
        };

        let parsedData = JSON.stringify(dados);
        localStorage.setItem('modoDark', parsedData);
    },

    get() {
        let data = localStorage.getItem('modoDark');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        return dataJson;
    },

    delete() {
        localStorage.removeItem('modoDark');
    }, 

    update(data: any) {
        const dados = {
            isModoDark: (data.isModoDark ?? StorageModoDark.get().isModoDark)
        };

        let parsedData = JSON.stringify(dados);
        localStorage.setItem('modoDark', parsedData);
    }
}