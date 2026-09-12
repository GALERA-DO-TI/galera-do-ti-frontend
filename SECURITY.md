# Política de Segurança — Galera do TI (Frontend)

## 1. Visão Geral

Este repositório contém o frontend da aplicação Galera do TI, construído em **TypeScript, Next.js e React**. Esta política descreve como reportar e prevenir vulnerabilidades específicas da camada de interface.

## 2. Superfície de Ataque

As principais ameaças do frontend incluem:

- **XSS (Cross-Site Scripting):** Injeção de scripts via inputs do usuário renderizados sem sanitização.
- **CSRF (Cross-Site Request Forgery):** Requisições não autorizadas usando sessão ativa do usuário.
- **Exposição de Tokens:** Vazamento de JWT ou chaves de API no código client-side.
- **Dependency Confusion:** Pacotes maliciosos introduzidos via `package.json`.

## 3. Como Reportar

NÃO abra Issues públicas para vulnerabilidades de segurança.

1. Use a aba **Security** → "Report a vulnerability" neste repositório, OU
2. Envie um e-mail para: [EMAIL_DO_ADMIN@dominio.com]

Inclua: descrição da falha, impacto, passo a passo de reprodução e sugestão de correção.

## 4. Escopo

| Em escopo | Fora de escopo |
|-----------|---------------|
| Componentes React/Next.js | Infraestrutura AWS |
| Sanitização de inputs no client | Lógica do backend (Lambda) |
| Headers de segurança (CSP, HSTS) | Banco de dados |
| Gerenciamento de tokens no client | Configuração de CI/CD |
| Validação de formulários | Autenticação server-side |

## 5. Checklist de Segurança para PRs

Antes de submeter um Pull Request:

- [ ] Inputs são sanitizados com DOMPurify ou equivalente antes de renderizar HTML
- [ ] Não há `dangerouslySetInnerHTML` sem sanitização
- [ ] Tokens JWT não são armazenados em localStorage (use httpOnly cookies)
- [ ] Não há chaves de API ou secrets hardcoded no código
- [ ] Dependências novas foram verificadas com `npm audit`
- [ ] Content Security Policy (CSP) não é violado por novos recursos
- [ ] Formulários implementam CSRF tokens
- [ ] Variáveis de ambiente usam prefixo `NEXT_PUBLIC_` apenas quando estritamente necessário

## 6. Ferramentas de Segurança

- **npm audit:** Executado no CI/CD a cada PR
- **Dependabot:** Alertas automáticos para dependências vulneráveis
- **ESLint Security Plugin:** Análise estática de padrões inseguros

## 7. Divulgação Responsável

- Dê tempo razoável para a correção antes de divulgar publicamente
- Não explore a vulnerabilidade para acessar dados de terceiros
- Não realize ataques de DoS ou engenharia social

---

Responsável: Equipe de Segurança — Galera do TI
