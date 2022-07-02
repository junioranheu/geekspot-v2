export const modoDark = {
    set(data) {
        // console.log(data);
        const dados = {
            isModoDark: data.isModoDark
        };
        // console.log(dadosUsuario);

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
        localStorage,removeItem('modoDark');
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