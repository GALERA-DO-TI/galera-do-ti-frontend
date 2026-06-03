/**
 * Configuração do AWS Amplify para autenticação utilizando o Amazon Cognito.
 *
 * @property {Object} Auth - Configuração relacionada à autenticação.
 * @property {Object} Auth.Cognito - Configuração do Amazon Cognito.
 * @property {string} Auth.Cognito.userPoolClientId - ID do user pool client do Cognito, obtido das variáveis de ambiente.
 * @property {string} Auth.Cognito.userPoolId - ID do user pool do Cognito, obtido das variáveis de ambiente.
 */
export const amplifyConfig: any = {
    Auth: {
      Cognito: {
        userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
        userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
      },
    },
  };
  