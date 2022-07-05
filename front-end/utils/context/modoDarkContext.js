import { createContext, useState } from 'react';

// Criar o contexto para usar no providar abaixo;
export const ModoDarkContext = createContext();

// Provider: para "segurar" uma informação e passar para todos os componentes "child";
export const ModoDarkProvider = props => {
    // console.log(StorageModoDark.get()?.isModoDark, (StorageModoDark.get()?.isModoDark ? true : false));
    const [isModoDark, setIsModoDark] = useState(StorageModoDark.get()?.isModoDark ? true : false);

    return (
        <ModoDarkContext.Provider value={[isModoDark, setIsModoDark]}>
            {props.children}
        </ModoDarkContext.Provider>
    );
}

export const StorageModoDark = {
    set(data) {
        // console.log(data);
        const dados = {
            isModoDark: data.isModoDark
        };
        // console.log(dados);

        let parsedData = JSON.stringify(dados);
        localStorage.setItem('modoDark', parsedData);
    },

    get() {
        let data = localStorage.getItem('modoDark');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        // console.log(dataJson);
        return dataJson;
    },

    delete() {
        localStorage, removeItem('modoDark');
        // window.location.reload();
    },

    update(data) {
        // console.log(data);
        const dados = {
            isModoDark: data.isModoDark,
        };
        // console.log(dados);

        let parsedData = JSON.stringify(dados);
        localStorage.setItem('modoDark', parsedData);
    }
}