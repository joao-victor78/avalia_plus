# Avalia++

Aplicação web de diário e catálogo de filmes, inspirada no Letterboxd.

## Aluno

- João Victor Alves da Mota

## Tema escolhido

Diário de filmes e avaliações.

## Descrição

O Avalia++ permite pesquisar filmes pela API OMDb, registrar avaliações pessoais e criar uma lista de filmes para assistir posteriormente. Os dados principais são persistidos no PostgreSQL por uma API Java e exibidos no front-end React.

Entre as funcionalidades estão:

- Busca de filmes pela OMDb;
- Cadastro e listagem de avaliações;
- Edição e exclusão de registros;
- Lista **Quero ver**;
- Dashboard com total cadastrado, assistidos, filmes para ver e nota média;
- Atualização automática da interface após cada operação.

## Tecnologias utilizadas

### Front-end

- React 19;
- Vite;
- TypeScript;
- Bootstrap 5;
- Fetch API;
- API OMDb.

### Back-end

- Java 17;
- Jakarta Servlets;
- JDBC;
- Padrões DAO e ConnectionFactory;
- Gson;
- Maven;
- Apache Tomcat.

### Banco de dados

- PostgreSQL.

## Estrutura do projeto

```text
avalia_plus/
├── backend/                 # API Java
│   └── src/main/java/br/com/avaliaplus/
│       ├── config/          # ConnectionFactory
│       ├── dao/             # Acesso ao PostgreSQL
│       ├── filter/          # Configuração de CORS
│       ├── model/           # Modelo Filme
│       └── servlet/         # Endpoints REST
├── database/
│   └── schema.sql           # Criação do banco e tabela
├── src/
│   ├── components/          # Componentes React
│   ├── interfaces/          # Interfaces TypeScript
│   └── services/            # Comunicação com APIs
├── .env.example
├── .gitignore
└── README.md
```

## Como criar o banco de dados

Com o PostgreSQL instalado e em execução, rode na raiz do projeto:

```bash
psql -U postgres -f database/schema.sql
```

O script cria:

- Banco `avalia_plus`;
- Tabela `filmes`;
- Chave primária `id`;
- Restrições de nota, ano e status;
- Registros iniciais para demonstração.

Por padrão, o back-end utiliza:

```text
Banco: avalia_plus
Usuário: postgres
Senha: postgres
Host: localhost
Porta: 5432
```

## Como rodar o back-end

Configure outras credenciais, se necessário:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/avalia_plus
export DB_USER=postgres
export DB_PASSWORD=postgres
```

Compile o projeto:

```bash
cd backend
mvn clean package
```

O arquivo será gerado em:

```text
backend/target/avalia-api.war
```

Publique o WAR em um servidor compatível com Jakarta Servlet, como Apache Tomcat. A API ficará disponível em:

```text
http://localhost:8080/avalia-api/filmes
```

## Como rodar o front-end

Na raiz do projeto:

```bash
npm install
```

Crie um arquivo `.env` com base no `.env.example`:

```env
VITE_API_URL=http://localhost:8080/avalia-api/filmes
VITE_OMDB_API_KEY=sua_chave_da_omdb
```

O arquivo `.env` é ignorado pelo Git e não deve ser enviado ao GitHub.

Inicie o Vite:

```bash
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Endpoints da API

| Método | Endpoint | Operação |
|---|---|---|
| `GET` | `/avalia-api/filmes` | Lista todos os filmes |
| `GET` | `/avalia-api/filmes/{id}` | Busca um filme pelo ID |
| `POST` | `/avalia-api/filmes` | Cadastra um filme |
| `PUT` | `/avalia-api/filmes/{id}` | Atualiza um filme |
| `DELETE` | `/avalia-api/filmes/{id}` | Exclui um filme |

Exemplo de corpo JSON:

```json
{
  "imdbId": "tt0317248",
  "titulo": "Cidade de Deus",
  "diretor": "Fernando Meirelles, Katia Lund",
  "genero": "Crime, Drama",
  "ano": 2002,
  "posterUrl": "https://exemplo.com/poster.jpg",
  "sinopse": "Sinopse do filme.",
  "status": "ASSISTIDO",
  "nota": 5.0,
  "comentario": "Uma avaliação pessoal do filme.",
  "dataAssistido": "2026-06-09"
}
```

## Arquitetura

O front-end foi dividido em componentes React, interfaces TypeScript e serviços. O `filmeService` centraliza as requisições para a API Java, enquanto o `omdbService` realiza buscas na OMDb.

No back-end, o `FilmeServlet` recebe as requisições HTTP e retorna JSON. O `FilmeDAO` implementa o CRUD com JDBC, e a `ConnectionFactory` abre as conexões com o PostgreSQL. O modelo `Filme` representa os dados persistidos.

Após operações de cadastro, atualização ou exclusão, o React consulta novamente a API para atualizar a listagem e o dashboard.

## CORS

O front-end e o back-end executam em origens diferentes:

- React: `http://localhost:5173`;
- Java: `http://localhost:8080`.

O `CorsFilter` permite as origens locais autorizadas, os métodos `GET`, `POST`, `PUT`, `DELETE` e `OPTIONS`, além do cabeçalho `Content-Type`.

## Prints da aplicação

Antes da entrega, adicione nesta seção prints reais contendo:

1. Tela principal e dashboard;
2. Busca de filmes na OMDb;
3. Formulário de avaliação;
4. Avaliação publicada na listagem;
5. Testes dos endpoints no Postman.

## Vídeo explicativo

**Link pendente:** adicione aqui o link público do vídeo de 3 a 5 minutos.

O vídeo deve apresentar o tema, front-end, back-end, banco de dados, CRUD, integração React/Java, CORS, Postman e a aplicação funcionando.

## Repositório

<https://github.com/joao-victor78/avalia_plus>
