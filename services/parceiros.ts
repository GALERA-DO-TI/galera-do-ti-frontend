import { AxiosInstance } from "axios";
import { createAPI, configAPI } from "./api";
import { Parceiro, PropostaParceria } from "@/interfaces/parceiros";

let api: AxiosInstance;
const initAPI = async () => (api = await createAPI?.(configAPI));
initAPI();

export const getParceiros = async (): Promise<Parceiro[]> => {
  try {
    if (!api) await initAPI();
    const { data } = await api.get("/parceiros");
    return data;
  } catch (err) {
    const error = err as string;
    throw new Error(error);
  }
};

export const enviarPropostaParceria = async (
  proposta: PropostaParceria,
): Promise<void> => {
  try {
    if (!api) await initAPI();
    await api.post("/parceiros/propostas", proposta);
  } catch (err) {
    const error = err as string;
    throw new Error(error);
  }
};
