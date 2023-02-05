import { createClient } from './makeRequests';
import { authService } from './authService';
import { accessTokenService } from './accessTokenService';

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request: any) {
  console.log('onRequest function invoked');
  const accessToken = localStorage.getItem('accessToken');
  console.log('Access token from local storage:', accessToken);
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
    console.log('Authorization header set:', request.headers['Authorization']);
  }


  return request;
}

function onResponseSuccess(res: any ) {
  return res.data;
}

async function onResponseError(error: any) {
  const originalRequest = error.config;

  if (error.response.status !== 401) {
    throw error;
  }

  console.log('401 error received, refreshing access token');
  try {
    // @ts-ignore
    const { accessToken } = await authService.refresh();

    accessTokenService.save(accessToken);

    console.log('Access token refreshed:', accessToken);

    return httpClient.request(originalRequest);
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}