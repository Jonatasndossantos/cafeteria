// Helper para gerenciar autenticação e tokens

/**
 * Obtém o token de autenticação de várias fontes possíveis
 */
export const getAuthToken = (): string | null => {
  // 1. Tenta obter do localStorage
  const localToken = localStorage.getItem('auth_token');
  if (localToken) return localToken;

  // 2. Tenta obter do sessionStorage
  const sessionToken = sessionStorage.getItem('auth_token');
  if (sessionToken) return sessionToken;

  // 3. Tenta obter do meta tag (Inertia.js)
  const metaToken = document.querySelector('meta[name="auth-token"]')?.getAttribute('content');
  if (metaToken) return metaToken;

  // 4. Tenta obter do meta tag do Laravel Sanctum
  const sanctumToken = document.querySelector('meta[name="sanctum-token"]')?.getAttribute('content');
  if (sanctumToken) return sanctumToken;

  // 5. Tenta obter do meta tag do CSRF (às vezes usado para autenticação)
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (csrfToken) return csrfToken;

  return null;
};

/**
 * Configura o token de autenticação no axios
 */
export const configureAxiosAuth = (axiosInstance: any) => {
  const token = getAuthToken();

  if (token) {
    // Se temos um token, configura como Bearer
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Se não temos token, remove o header Authorization
    delete axiosInstance.defaults.headers.common['Authorization'];
  }

  // Garante que withCredentials está true para cookies
  axiosInstance.defaults.withCredentials = true;
};

/**
 * Salva o token de autenticação
 */
export const saveAuthToken = (token: string, persistent: boolean = true) => {
  if (persistent) {
    localStorage.setItem('auth_token', token);
  } else {
    sessionStorage.setItem('auth_token', token);
  }
};

/**
 * Remove o token de autenticação
 */
export const clearAuthToken = () => {
  localStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_token');
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
