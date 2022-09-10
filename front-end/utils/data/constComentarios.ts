import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/_urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/Comentarios/todos',
    GET_POR_ID: 'api/Comentarios',
    POST_CRIAR: 'api/Comentarios/criar',
    POST_ATUALIZAR: 'api/Comentarios/atualizar',
    POST_DELETAR: 'api/Comentarios/deletar',
    GET_POR_ITEM_ID: 'api/Comentarios/porItemId'
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_POST_ATUALIZAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_ATUALIZAR}`,
    API_URL_POST_DELETAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_DELETAR}`,
    API_URL_GET_POR_ITEM_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ITEM_ID}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_POST_ATUALIZAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_ATUALIZAR}`,
    API_URL_POST_DELETAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_DELETAR}`,
    API_URL_GET_POR_ITEM_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ITEM_ID}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTS;