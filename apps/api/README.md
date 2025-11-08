# API do Encurtador de URLs

Serviço de API RESTful para encurtamento de URLs com rastreamento de cliques, datas de expiração e geração de códigos QR.

## Funcionalidades

- 🔗 Encurtamento de URLs com slugs personalizados
- ⏱️ Suporte a expiração de links
- 🔢 Limite máximo de cliques
- 📊 Rastreamento de cliques
- 📷 Geração de código QR
- 🔍 Listagem e busca de links

## Tecnologias Utilizadas

- Runtime Bun
- TypeScript
- Prisma ORM
- Banco de dados SQLite
- Design de API RESTful

## Como Começar

### Pré-requisitos

- Runtime Bun instalado
- SQLite (incluído com Bun)

### Instalação

1. Instale as dependências:
```bash
bun install
```

2. Configure as variáveis de ambiente:
```bash
# Copie o exemplo de ambiente
cp .env.example .env

# Configure a URL do banco de dados (SQLite por padrão)
DATABASE_URL="file:./dev.db"
```

3. Configure o banco de dados:
```bash
# Execute as migrações
bunx prisma migrate dev
```

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
bun run dev
```

A API estará disponível em `http://localhost:8787`

## Documentação da API

### Endpoints

#### Criar URL Curta
```http
POST /api/links
```

Corpo da requisição:
```json
{
  "destination": "https://example.com",
  "slug": "slug-personalizado",  // opcional
  "expiresAt": "2024-12-31",    // opcional
  "maxClicks": 100              // opcional
}
```

Resposta:
```json
{
  "id": "...",
  "slug": "slug-personalizado",
  "destination": "https://example.com",
  "shortUrl": "http://localhost:8787/slug-personalizado",
  "expiresAt": "2024-12-31T00:00:00.000Z",
  "maxClicks": 100,
  "createdAt": "2023-11-08T12:00:00.000Z"
}
```

#### Listar Todas as URLs
```http
GET /api/links
```

Resposta:
```json
[
  {
    "id": "...",
    "slug": "slug-personalizado",
    "destination": "https://example.com",
    "clickCount": 0,
    "expiresAt": "2024-12-31T00:00:00.000Z",
    "createdAt": "2023-11-08T12:00:00.000Z",
    "lastAccessAt": null
  }
]
```

#### Obter Código QR
```http
GET /api/links/:slug/qr
```

Retorna uma imagem PNG com o código QR para a URL curta.

#### Redirecionar para URL Original
```http
GET /:slug
```

Redireciona para a URL original e incrementa o contador de cliques.

## Estrutura do Projeto

```
api/
├── prisma/
│   ├── schema.prisma    # Esquema do banco de dados
│   └── migrations/      # Migrações do banco de dados
├── src/
│   ├── index.ts        # Configuração do servidor
│   ├── routes.ts       # Rotas da API
│   ├── db.ts          # Cliente do banco de dados
│   └── utils.ts       # Funções auxiliares
└── package.json
```

## Esquema do Banco de Dados

```prisma
model Link {
  id           String    @id @default(cuid())
  slug         String    @unique
  destination  String
  createdAt    DateTime  @default(now())
  expiresAt    DateTime?
  maxClicks    Int?
  clickCount   Int       @default(0)
  lastAccessAt DateTime?
}
```

## Variáveis de Ambiente

| Variável      | Descrição           | Valor Padrão     |
|---------------|--------------------|-------------------|
| DATABASE_URL  | URL de conexão do banco de dados | "file:./dev.db" |
| PORT         | Porta do servidor | 8787 |

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
