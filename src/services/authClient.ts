import { createClient } from './makeRequests';

export const authClient = createClient();

authClient.interceptors.response.use(res => res.data);