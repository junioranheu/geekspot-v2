import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/_urlApi';

const ENDPOINTS = {
    POST_REGISTRAR: 'api/Autenticar/registrar',
    POST_LOGIN: 'api/Autenticar/login',
};

const DEV = {
    API_URL_POST_REGISTRAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_REGISTRAR}`,
    API_URL_POST_LOGIN: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_LOGIN}`
};

const PROD = {
    API_URL_POST_REGISTRAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_REGISTRAR}`,
    API_URL_POST_LOGIN: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_LOGIN}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;