# Projeto de Gerenciamento de Serviços Automotivos

Este projeto é uma API para o gerenciamento de serviços automotivos, desenvolvido com Node.js e TypeScript. Ele permite o cadastro, consulta, atualização e remoção de clientes, veículos e serviços automotivos.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no servidor.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática e outros recursos.
- **Express**: Framework web para Node.js.
- **Mongoose**: Biblioteca para modelagem de dados do MongoDB.
- **Jest**: Framework de testes em JavaScript.
- **Swagger**: Ferramenta para documentação de APIs.
- **Nodemon**: Ferramenta que reinicia automaticamente o servidor ao detectar mudanças no código.
- **ESLint**: Ferramenta de análise estática para identificar e corrigir problemas no código JavaScript/TypeScript.
- **Prettier**: Formatador de código que ajuda a manter um estilo consistente.

## Estrutura de Pastas

```bash
src/
├── controllers/
├── models/
├── routes/
├── utils/
├── utils/
├── __tests__/
├── server.ts
├── swagger.ts
└── app.ts
```

## Instalação e Configuração
### Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```
### Instale as dependências:

```bash
npm install
```
### Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
```bash
MONGO_URI=<sua-uri-do-mongodb>
PORT=3000
```
### Inicie o servidor:
```bash
npm run dev
```
### O servidor será iniciado em http://localhost:3000.

## Scripts Disponíveis
- npm run start: Inicia o servidor em modo de desenvolvimento com nodemon.
- npm run build: Compila o projeto TypeScript para JavaScript.
- npm start: Inicia o servidor usando o código compilado.
- npm test: Executa os testes usando Jest.

## Documentação da API
### A documentação da API está disponível no formato Swagger. Após iniciar o servidor, acesse:

http://localhost:3000/api-docs

## Testes
### Os testes são realizados utilizando o framework Jest. Para executar os testes, utilize:
```bash
npm test
```

    
