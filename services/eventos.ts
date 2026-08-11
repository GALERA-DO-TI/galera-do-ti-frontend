import { AxiosInstance } from "axios";
import { createAPI, configAPI } from "./api";
import { Evento } from "@/interfaces/events";

let api: AxiosInstance;
const initAPI = async () => (api = await createAPI?.(configAPI));
initAPI();

export const getEventos = async (): Promise<Evento[]> => {
  try {
    if (!api) await initAPI();
    const { data } = await api.get("/eventos");
    return data;
  } catch (err) {
    const error = err as string;
    throw new Error(error);
  }
};
