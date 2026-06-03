import { createAPI, configAPI } from "./api";

let api: any;
const initAPI = async () => (api = await createAPI?.(configAPI));
initAPI();

export const getMembers = async (): Promise<void> => {
  try {
    if (!api) await initAPI();
    const { data } = await api.get("/profile/member");
    return data;
  } catch (err) {
    const error = err as string;
    throw new Error(error);
  }
};
