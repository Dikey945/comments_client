import { authClient } from './authClient';

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

function register({ email, password, name }: RegisterParams) {
  return authClient.post('/registration', { email, password, name })
}

function login({ email, password }: LoginParams) {
  return authClient.post('/registration/login', { email, password })
}

function logout() {
  return authClient.post('/logout')
}

function activate(activationToken: string | undefined) {
  return authClient.get(`/registration/activate/${activationToken}`);
}

function refresh() {
  return authClient.get('/registration/refresh');
}

export const authService = { register, login, logout, activate, refresh };