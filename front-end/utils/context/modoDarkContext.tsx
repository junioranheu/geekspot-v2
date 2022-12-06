import { createContext, useState } from 'react';

interface iContext {
    isModoDarkContext: [isModoDark: boolean | null, setIsModoDark: any];
    testeContext: [teste: boolean, setTeste: any];
}

const _item = '_modoDark';
export const ModoDarkContext = createContext<iContext | null>(null);

export const ModoDarkProvider = (props: any) => {
    const [isModoDark, setIsModoDark] = useState(localStorage.getItem(_item) !== null ? StorageModoDark.get().isModoDark : null);
    const [teste, setTeste] = useState<boolean>(true);

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
        localStorage.setItem(_item, parsedData);
    },

    get() {
        let data = localStorage.getItem(_item);

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        return dataJson;
    },

    delete() {
        localStorage.removeItem(_item);
    },

    update(data: any) {
        const dados = {
            isModoDark: (data.isModoDark ?? StorageModoDark.get().isModoDark)
        };

        let parsedData = JSON.stringify(dados);
        localStorage.setItem(_item, parsedData);
    }
}