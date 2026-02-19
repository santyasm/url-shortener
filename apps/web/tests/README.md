# Testes End-to-End (Playwright)

Estrutura completa e pronta para desenvolvimento contínuo de testes E2E com Playwright.

## Estrutura

```
apps/web/
├── playwright.config.ts
├── .env.test
└── tests/
    ├── e2e/
    │   ├── home.spec.ts
    │   ├── create-link.spec.ts
    │   └── navigation.spec.ts
    ├── fixtures/
    │   └── testFixtures.ts
    └── utils/
        ├── apiMock.ts
        └── pages/
            └── AppPage.ts
```

## Como rodar

1. Instale dependências e browsers:

```bash
cd apps/web
npm install
npx playwright install --with-deps
```

2. Rodar testes em modo headless:

```bash
npm run test:e2e
```

3. Rodar em modo UI:

```bash
npm run test:e2e:ui
```

4. Rodar em modo debug:

```bash
npm run test:e2e:debug
```

## Variáveis de ambiente

- `E2E_BASE_URL`: baseURL da aplicação (padrão: `http://localhost:5173`).
- `E2E_HEADLESS`: controla headless (`true`/`false`). Padrão `true`.
- Arquivo de exemplo: [apps/web/.env.test](file:///Users/yasmin/Documents/projects/studies/url-shortener/apps/web/.env.test)

## Criar novos testes

- Coloque novos testes em `apps/web/tests/e2e`.
- Utilize o Page Object `AppPage` para ações comuns da UI.
- Para dados previsíveis, use utilitários de mock (`apiMock.ts`) ou gere dados via API programaticamente usando o `request` do Playwright.

Exemplo de teste simples:

```ts
import { test, expect } from "../fixtures/testFixtures";
import { mockList } from "../utils/apiMock";

test("home mostra form", async ({ page, app }) => {
  await mockList(page, []);
  await app.goto();
  await expect(app.shortenButton()).toBeVisible();
});
```

## Boas práticas

- Mantenha testes independentes e determinísticos.
- Não dependa de dados reais: use mocks ou bases de teste.
- Use o Page Object Pattern para reduzir acoplamento com seletores.
- Ative `trace`, `screenshot` e `video` para facilitar debugging em falhas (já configurado).
- Use `retries` moderadamente: definidos para `CI`.

## Execução em CI

- Workflow pronto em `.github/workflows/e2e.yml`.
- Usa Node 18, instala Playwright e executa os testes.
- Cache de dependências habilitado quando `package-lock.json` existir.

