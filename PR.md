# ENGWEB2025-Normal

- **Data**: 30/05/2025
- **Nome** : Marco António Fernandes Brito

Este repositório contém a solução para o exame de época normal da UC de Engenharia Web (3º ano LEI).

## Estrutura do Repositório

- **ex1**: API de dados para o dataset do Festival Eurovisão
- **ex2**: Interface web para visualização dos dados
- **PR.md**: Este ficheiro com informações sobre o projeto

## Persistência de Dados

### Base de Dados

Para este projeto, foi utilizado o MongoDB como sistema de gestão de base de dados. A base de dados foi configurada com os seguintes parâmetros:

- **Nome da base de dados**: eurovisao
- **Coleção principal**: edicoes

### Processamento do Dataset

O dataset original foi transformado num formato mais limpo e consistente, com campos normalizados (sem acentos e em minúsculas), estrutura em lista de edições, e todos os campos relevantes presentes (mesmo que com valor null), facilitando a importação para MongoDB e o uso numa API REST.


### Modelo de Dados

O modelo de dados utilizado consiste em:

- **Edicao**: Representa uma edição do Festival Eurovisão
  - id: String (identificador único)
  - ano_edicao: String (ano da edição)
  - organizacao: String (país organizador)
  - vencedor: String (país vencedor)
  - musicas: Array de objetos Musica

- **Musica**: Representa uma música participante
  - id: String (identificador único)
  - link: String (link para o vídeo)
  - titulo: String (título da música)
  - pais: String (país representado)
  - compositor: String (compositor da música)
  - interprete: String (intérprete da música)
  - letra: String (autor da letra)

## Instruções de Execução



### Configuração da Base de Dados

1. Inicie o servidor MongoDB:


### Execução da API de Dados (ex1)

1. Instale as dependências:
   ```
   cd ex1
   npm i
   ```

2. Inicie o servidor:
   ```
   npm start
   ```

3. A API estará disponível em http://localhost:25000

### Execução da Interface Web (ex2)

1. Instale as dependências:
   ```
   cd ex2
   npm i
   ```

2. Inicie o servidor:
   ```
   npm start
   ```

3. A interface estará disponível em http://localhost:25001

## Queries MongoDB

As queries MongoDB solicitadas estão disponíveis no ficheiro `ex1/queries.txt`. Estas queries respondem às seguintes questões:

1. Quantos registos estão na base de dados
2. Quantos edições têm "Ireland" como vencedor
3. Lista de intérpretes (ordenada alfabeticamente e sem repetições)
4. Distribuição de músicas por edição
5. Distribuição de vitórias por país

## Rotas da API

### Exercício 1 (API de Dados)

- **GET /edicoes**: Lista todas as edições
- **GET /edicoes/:id**: Obtém uma edição específica
- **GET /edicoes?org=EEEE**: Lista edições organizadas por um país específico
- **GET /paises?papel=org**: Lista países organizadores
- **GET /paises?papel=venc**: Lista países vencedores
- **GET /interpretes**: Lista todos os intérpretes
- **POST /edicoes**: Adiciona uma nova edição
- **DELETE /edicoes/:id**: Remove uma edição
- **PUT /edicoes/:id**: Atualiza uma edição

### Exercício 2 (Interface Web)

- GET /edicoes: devolve uma lista com todas as edições (campos: anoEdição, organizador e vencedor);
- GET /edicoes/:id: devolve toda a informação da edição com identificador id;
- GET /edicoes?org=EEEE: devolve a lista das edições que foram organizadas por EEEE (campos:anoEdição, organizador e vencedor);
- GET /paises?papel=org: devolve a lista dos países organizadores, ordenada alfabeticamente por nome e sem repetições (lista de pares: país, lista de anos em que organizou);
- GET /paises?papel=venc: dos países vencedores, ordenada alfabeticamente por nome e sem
- repetições(lista de pares: país, lista de anos em que venceu);
- GET /interpretes: devolve a lista dos intérpretes, com o nome e o país que o intérprete
- representou, ordenada alfabeticamente por nome e sem repetições;
- POST /edicoes: acrescenta um registo novo à BD, neste caso, uma nova edição;
- DELETE /edicoes/:id: elimina da BD o registo correspondente à edição com o identificador id;
- PUT /edicoes/:id: altera o registo da edição com o identificador id

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: Pug, W3.CSS
- **Base de Dados**: MongoDB
- **Bibliotecas**: Mongoose, Axios
