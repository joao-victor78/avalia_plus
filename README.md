# Avalia++

## Integrantes

- Informe aqui o nome completo dos integrantes.

## Tema Escolhido

Diario de filmes e avaliacoes, inspirado no Letterboxd.

## Descricao da Aplicacao

O Avalia++ e uma aplicacao web para buscar filmes pela API OMDb e registrar avaliacoes pessoais. O usuario pesquisa um filme, seleciona o resultado, informa nota, comentario, status e data assistida. As avaliacoes ficam salvas no PostgreSQL por meio do back-end Java.

## Tecnologias Utilizadas

- Front-end: React, Vite, TypeScript, Bootstrap e consumo da API OMDb
- Back-end: Java 17, JSP/Servlets, JDBC/ConnectionFactory e Gson
- Banco de dados: PostgreSQL
- Build back-end: Maven

## Como Criar o Banco de Dados

1. Acesse o PostgreSQL.
2. Execute o script:

```bash
psql -U postgres -f database/schema.sql
```

O script cria o banco `avalia_plus`, a tabela `filmes` e alguns registros iniciais de avaliacoes.

## Como Rodar o Back-end

1. Entre na pasta do back-end:

```bash
cd backend
```

2. Gere o arquivo WAR:

```bash
mvn clean package
```

3. Publique `backend/target/avalia-api.war` em um servidor compativel com Jakarta Servlet 6, como Tomcat 11.

4. Configure as credenciais do banco, se necessario:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/avalia_plus
export DB_USER=postgres
export DB_PASSWORD=postgres
```

Sem variaveis de ambiente, o projeto usa `postgres/postgres` em `localhost:5432`.

## Endpoints da API

- `GET /avalia-api/filmes`: lista todas as avaliacoes
- `GET /avalia-api/filmes/{id}`: busca uma avaliacao por id
- `POST /avalia-api/filmes`: cadastra uma avaliacao
- `PUT /avalia-api/filmes/{id}`: atualiza uma avaliacao
- `DELETE /avalia-api/filmes/{id}`: exclui uma avaliacao

Exemplo de JSON:

```json
{
  "imdbId": "tt0317248",
  "titulo": "Central do Brasil",
  "diretor": "Walter Salles",
  "genero": "Drama",
  "ano": 1998,
  "posterUrl": "https://exemplo.com/poster.jpg",
  "sinopse": "Sinopse retornada pela OMDb.",
  "status": "ASSISTIDO",
  "nota": 4.5,
  "comentario": "Uma avaliacao escrita pelo usuario.",
  "dataAssistido": "2026-06-09"
}
```

## Como Rodar o Front-end

1. Instale as dependencias:

```bash
npm install
```

2. Rode o Vite:

```bash
npm run dev
```

3. Acesse:

```text
http://localhost:5173
```

Por padrao, o front-end consome:

```text
http://localhost:8080/avalia-api/filmes
```

Para mudar a URL ou a chave da OMDb, crie um arquivo `.env` baseado no `.env.example`:

```text
VITE_API_URL=http://localhost:8080/avalia-api/filmes
VITE_OMDB_API_KEY=sua_chave_omdb
```

## Arquitetura

O front-end React foi organizado em componentes, interfaces TypeScript e camadas de servico para centralizar as chamadas `fetch`. O servico `omdbService` consulta a OMDb para auxiliar na busca de filmes. O servico `filmeService` conversa com o back-end Java, que persiste as avaliacoes no PostgreSQL. O back-end usa Servlets para expor os endpoints REST, DAO para concentrar o CRUD com JDBC e `ConnectionFactory` para abrir a conexao com o banco.

O CORS foi configurado no filtro `CorsFilter`, permitindo que o React em `http://localhost:5173` acesse a API Java em `http://localhost:8080`.

## Prints da Aplicacao

Adicione aqui prints da busca OMDb, do cadastro da avaliacao, da listagem, da edicao e dos testes da API no Postman.

## Video Explicativo

Adicione aqui o link do video de 3 a 5 minutos.
