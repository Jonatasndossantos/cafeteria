import axios from 'axios';
import { configureAxiosAuth } from './lib/auth';

// Configuração base do axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// Configurar o baseURL para API
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// Configurar o token CSRF
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
}

// Configurar autenticação inicial
configureAxiosAuth(axios);

// Interceptor para tratamento de erros
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Se a resposta for 401 (Unauthenticated)
            if (error.response?.data?.message === 'Unauthenticated.') {
                // Redireciona para a página de login
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Configurar o interceptor de requisição para garantir que os cookies sejam enviados
// e que o token de autenticação seja incluído
axios.interceptors.request.use(
    config => {
        // Garantir que withCredentials está true
        config.withCredentials = true;

        // Configurar autenticação antes de cada requisição
        configureAxiosAuth(axios);

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
