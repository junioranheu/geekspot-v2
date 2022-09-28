import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../api/urlApi';

const ENDPOINTS = {
    // "Não-protegido", arquivos da pasta Upload, que estão liberados;
    GET_ITENS_IMAGENS: 'Upload/itens/imagem',
    GET_USUARIOS_IMAGENS: 'Upload/usuarios/perfil/imagem',
    GET_USUARIOS_LOJINHAS_CAPAS: 'Upload/usuarios/lojinha/imagem',

    // "Protegidos", arquivos que estão na pasta UploadProtegido e devem ser chamados pela API;
};

const DEV = {
    API_URL_GET_ITENS_IMAGENS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_ITENS_IMAGENS}`,
    API_URL_GET_USUARIOS_IMAGENS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_USUARIOS_IMAGENS}`,
    API_URL_GET_USUARIOS_LOJINHAS_CAPAS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_USUARIOS_LOJINHAS_CAPAS}`
};

const PROD = {
    API_URL_GET_ITENS_IMAGENS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_ITENS_IMAGENS}`,
    API_URL_GET_USUARIOS_IMAGENS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_USUARIOS_IMAGENS}`,
    API_URL_GET_USUARIOS_LOJINHAS_CAPAS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_USUARIOS_LOJINHAS_CAPAS}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTS;