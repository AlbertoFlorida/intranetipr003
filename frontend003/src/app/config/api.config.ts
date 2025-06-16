// src/app/config/api.config.ts
// export const API_BASE_URL = 'https://api.intranetipr.fun/api';
//export const API_BASE_URL = 'https://localhost:8082/api';
export const API_BASE_URL = 'http://213.165.69.74:8080/api';


export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  planos: `${API_BASE_URL}/planos`,
  users: `${API_BASE_URL}/users`,
  datamatrix42: `${API_BASE_URL}/datamatrix42`,
  digitocontrol: `${API_BASE_URL}/digitocontrol`,
  comprobadores: `${API_BASE_URL}/comprobadores`,
  preformado: `${API_BASE_URL}/preformado`
};