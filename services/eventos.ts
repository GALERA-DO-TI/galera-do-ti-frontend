import { AxiosInstance } from "axios";
import { createAPI, configAPI } from "./api";

export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  dia: string;
  mes: string;
  local: string;
  categoria: "Presencial" | "Online" | "Workshop" | "Meetup";
  imagemUrl?: string;
}

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
