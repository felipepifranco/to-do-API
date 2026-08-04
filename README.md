# to-do-API

Essa é uma api de um sistema de lista de afazeres, que permite que sejam feitos requests a ela e ela armazene, em um banco de dados, garantindo persistência de dados.

Esse é um projeto com intuito educacional, feito para o processo seletivo da iJunior.

### Funcionalidades
- criar uma nova tarefa com nome, descrição, status de concluída ou não e um id
- ver todas as tarefas registradas
- ver uma tarefa específica
- editar campos de uma tarefa específica
- apagar uma tarefa específica

### Implementação

A implementação foi feita em TypeScript, utilizando de frameworks:

- Express para gerenciar requests e responses
- Prisma para gerenciar o banco de dados relacional


O projeto foi feito utilizando arquitetura MVC, separando o gerenciamento de dados e requestes em services, controllers e routes.

### SetUp
Para utilizar o projeto, é preciso seguir 3 passos principais de setup

#### 1. Básico
1. copiar repositório
  ```shell
  git clone git@github.com:felipepifranco/to-do-API.git
  ```
2. mudar para a branch correta
```shell
git checkout feature/db-tarefas
```
3. instalar as dependências do node com
  ```shell
  npm install
  ```

##### 2. Banco de dados
1. Ter o `mysql` já instalado e configurado 
2. rodar esse comando e digitar a senha configurada para o mysql (deve aparecer o promp `mysql>`):
  ```shell
  mysql -u root -p
  ```
3. criar uma nova base de dados com:
```sql
CREATE DATABASE bootcamp_tasks;
```
4. Digitar `exit` para sair do MySQL.
5. Criar um arquivo `.env` na pasta raiz do projeto e preencher ele com isso (lembrar de substituir "SUA_SENHA_AQUI" pela sua senha do mysql):
  ```
  DATABASE_URL="mysql://root:SUA_SENHA_AQUI@localhost:3306/bootcamp_tasks"
  DATABASE_USER="root"
  DATABASE_PASSWORD="SUA_SENHA_AQUI"
  DATABASE_NAME="bootcamp_tasks"
  DATABASE_HOST="localhost"
  DATABASE_PORT=3306
  ```

#### 3. Configuração prisma
1. rodar o comando `npx prisma migrate dev`
2. rodar o comando `npx prisma generate` 
3. rodar `npm run start`

Com tudo isso feito, requests feitos à API retornaram responses

### Documentação
Caso queira ver a documentação, é possível fazer isso pelo `postman`. Para isso:
1. Tenha o postman já baixado
2. baixe o arquivo [`To Do API - DB funcional.postman_collection.json`](<To Do API - DB funcional.postman_collection.json>) da pasta raiz do projeto
3. Com o postman aberto, clique em "import" (que fica acima da barra lateral, ao lado do nome) e selecione o arquivo
4. Abra o projeto no postman e clique em "view documentation"
5. também é possível ver exemplos e fazer requests pelo próprio postman