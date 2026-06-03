import { fetchAuthSession } from "aws-amplify/auth";
/**
 * Obtém a sessão de autenticação de forma assíncrona.
 *
 * @async
 * @function getSession
 * @returns {Promise<Object|null>} A sessão de autenticação, ou null em caso de erro.
 *
 * @throws {Error} Se ocorrer um erro ao buscar a sessão.
 */
export const getSession = async (): Promise<object | null> => {
  try {
    const session = await fetchAuthSession();
    return session;
  } catch (error) {
    console.log("Erro ao obter sessão:", error);
    return null;
  }
};
