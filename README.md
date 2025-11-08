# Encurtador de URLs

Um serviço moderno de encurtamento de URLs com rastreamento de cliques, datas de expiração e geração de códigos QR. Construído com React, TypeScript e Bun.

![Preview do Encurtador de URLs](./apps/web/docs/preview-desktop.png)

## 🌟 Funcionalidades

- 🔗 Crie URLs curtas instantaneamente
- ⏱️ Defina datas de expiração para links
- 🔢 Configure limites máximos de cliques
- 📊 Rastreie contagem de cliques
- 📱 Design responsivo
- 📷 Geração de código QR

## 🏗️ Estrutura do Projeto

Este é um monorepo contendo as aplicações frontend e backend:

- [📱 Documentação do Frontend](./apps/web/README.md)
- [⚙️ Documentação da API Backend](./apps/api/README.md)

```
url-shortener/
├── apps/
│   ├── web/           # Frontend React
│   └── api/           # Backend Bun + TypeScript
```

## 🚀 Início Rápido

### Pré-requisitos

- Runtime Bun
- Node.js 18+ (alternativa)
- SQLite (incluído com Bun)

### Configuração do Backend

```bash
# Navegue até o diretório da API
cd apps/api

# Instale as dependências
bun install

# Configure o ambiente
cp .env.example .env

# Execute as migrações
bunx prisma migrate dev

# Inicie o servidor da API
bun run dev
```

A API estará disponível em `http://localhost:8787`

### Configuração do Frontend

```bash
# Navegue até o diretório web
cd apps/web

# Instale as dependências
bun install

# Configure o ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
bun run dev
```

A interface web estará disponível em `http://localhost:5173`

## 📱 Capturas de Tela

### Versão Desktop
![Interface Desktop](./apps/web/docs/preview-desktop.png)

### Versão Mobile
![Interface Mobile](./apps/web/docs/preview-mobile.png)

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19
- TypeScript
- Vite
- Variáveis CSS
- Design Mobile-first

### Backend
- Runtime Bun
- TypeScript
- Prisma ORM
- SQLite
- API RESTful

## 📚 Documentação

- [Documentação do Frontend](./apps/web/README.md)
  - Componentes UI
  - Guia de Configuração
  - Instruções de Build

- [Documentação do Backend](./apps/api/README.md)
  - Endpoints da API
  - Esquema do Banco de Dados
  - Variáveis de Ambiente

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

---

<div align="center">
  <p>Desenvolvido com 💜 por Yasmin Santana</p>

[LinkedIn](https://www.linkedin.com/in/yasmin-santana-santos/) [GitHub](https://github.com/santyasm)
</div>