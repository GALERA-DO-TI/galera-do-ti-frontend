import { getSession } from "../helpers/auth";
import axios from "axios";

const configAPI = {
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  timeout: 30000,
};

const getAccessTokenCognito = async () => {
  try {
    const session: any = await getSession?.();
    console.log("Session: ", session);
    if (!session && !session?.tokens) return null;
    const accessToken = session?.tokens?.accessToken?.toString();
    return accessToken ? `Bearer ${accessToken}` : null;
  } catch (error) {
    console.error("Erro ao obter o access token:", error);
    return null;
  }
};

const createAPI = async (dataConfig: any) => {
  const api = axios.create({
    baseURL: dataConfig.baseURL,
    timeout: dataConfig.timeout,
  });

  api.interceptors.request.use(
    async (config) => {
      const accessToken = await getAccessTokenCognito();
      if (accessToken) config.headers.Authorization = accessToken;
      return config;
    },
    (error) => Promise.reject(error),
  );
  return api;
};

export { configAPI, createAPI, getAccessTokenCognito };
