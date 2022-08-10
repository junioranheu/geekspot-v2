import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/_urlApi';

const ENDPOINTS = {
    GET_POR_ID: 'api/Usuarios',
    GET_TODOS: 'api/Usuarios/todos',
    PUT_ATUALIZAR: 'api/Usuarios/atualizar'
};

const DEV = {
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR}`
};

const PROD = {
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;