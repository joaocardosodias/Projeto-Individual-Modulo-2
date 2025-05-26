
# StudyHub - Sistema de Reserva de Salas para o Inteli

## Descrição

O **StudyHub** é um projeto de aplicação web full-stack focado no gerenciamento eficiente de reservas de salas de estudo e outros espaços no Inteli. O sistema permite que alunos se cadastrem, façam login de forma segura, visualizem suas reservas (atuais e passadas) e criem novas reservas para as salas disponíveis na instituição.

O projeto segue uma estrutura baseada no padrão MVC (Model-View-Controller) e utiliza Node.js com Express para o backend, PostgreSQL (gerenciado via Supabase) como banco de dados, e HTML, CSS e JavaScript puro para o frontend.

### Nota sobre Design e Visualização

Esta aplicação foi desenhada com uma abordagem **mobile-first**, priorizando a experiência do usuário em dispositivos móveis. Para uma melhor visualização e desenvolvimento do layout responsivo diretamente no Visual Studio Code, recomenda-se o uso de extensões como a **"Mobile View"** (por exemplo, a extensão de Lazarus GH, `villivalaya.mobile-view`) ou o uso das ferramentas de simulação de dispositivos móveis integradas ao seu navegador.

## Funcionalidades Implementadas (Até o momento)

* **Autenticação de Usuários:**
    * Cadastro de novos alunos.
    * Login de alunos existentes com verificação de credenciais e hashing de senhas.
* **Interface Inicial:**
    * Tela de boas-vindas com opções de Login e Registro.
    * Páginas de Login e Registro com design responsivo e paleta de cores do Inteli.
* **Dashboard do Usuário (Estrutura Inicial):**
    * Layout básico para visualização de reservas atuais e antigas.
    * Botão flutuante para iniciar o processo de nova reserva.
* **Nova Reserva (Estrutura Inicial):**
    * Layout básico para seleção de sala, data (calendário visual) e blocos de horário.
    * Botão para confirmar a reserva.
* **Backend:**
    * API para endpoints de autenticação (`/login`, `/register`).
    * Script para inicialização automática do schema do banco de dados.
* **Desenvolvimento:**
    * Modo de desenvolvimento com reinicialização automática do servidor (`nodemon`).

## Tecnologias Utilizadas

* **Frontend:**
    * HTML5
    * CSS3 (com Flexbox/Grid para layout responsivo, abordagem Mobile-First)
    * JavaScript (Vanilla JS para interações e chamadas API via `Workspace`)
* **Backend:**
    * Node.js
    * Express.js (Framework web)
* **Banco de Dados:**
    * PostgreSQL (gerenciado na nuvem com Supabase)
    * `pg` (Node.js PostgreSQL client)
* **Autenticação e Segurança:**
    * `bcryptjs` (Para hashing de senhas)
* **Utilitários de Desenvolvimento:**
    * `nodemon` (Para reinicialização automática do servidor em desenvolvimento)
    * `dotenv` (Para gerenciamento de variáveis de ambiente)

## Estrutura do Projeto

O projeto está organizado dentro da pasta `src/` da seguinte forma:
````
src/
├── app.js                 # Arquivo principal do servidor Express
├── config/
│   └── db.js              # Configuração da conexão com o banco de dados
├── controllers/
│   └── authController.js  # Lógica de controle para autenticação
├── models/
│   └── userModel.js       # Interação com a tabela de usuários no BD
├── public/                # Arquivos estáticos (CSS, JS do cliente, imagens)
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
│   └── authRoutes.js      # Definição das rotas de autenticação
├── views/                 # Arquivos HTML servidos ao cliente
│   ├── index.html         # Tela inicial de boas-vindas
│   ├── login.html         # Tela de login
│   ├── register.html      # Tela de cadastro
│   ├── dashboard.html     # Tela de visualização de reservas
│   └── new_reservation.html # Tela para criar nova reserva
├── sql/
│   └── schema.sql         # Script SQL para criação das tabelas e dados iniciais
└── scripts/
└── initDb.js          # Script Node.js para inicializar o BD programaticamente
````
## Configuração do Ambiente de Desenvolvimento

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada, que inclui npm)
* Um cliente PostgreSQL (como `psql` ou DBeaver/pgAdmin) é útil para inspecionar o banco, mas não estritamente necessário se usar apenas o Supabase UI e o script de inicialização.
* Uma conta no [Supabase](https://supabase.com/) para hospedar o banco de dados PostgreSQL.
* (Recomendado) Visual Studio Code com a extensão "Mobile View" ou similar para facilitar o desenvolvimento do design mobile.

### Instalação

1.  **Clone o repositório** (se estiver em um repositório Git):
    ```bash
    git clone https://github.com/joaocardosodias/Projeto-Individual-Modulo-2
    cd Projeto-Individual-Modulo-2
    ```

2.  **Instale as dependências do projeto:**
    Navegue até a pasta raiz do projeto (onde o `package.json` está localizado) e execute:
    ```bash
    npm install
    ```

### Variáveis de Ambiente (`.env`)

1.  Crie um arquivo chamado `.env` na raiz do seu projeto.
2.  Adicione as seguintes variáveis de ambiente a este arquivo, substituindo pelos dados de conexão do seu banco de dados Supabase:

    ```env
    # Credenciais do Supabase (Encontre em Project Settings > Database > Connection info no Supabase)
    DB_HOST=seu_host_do_supabase.supabase.co
    DB_USER=postgres
    DB_PASSWORD=sua_senha_do_banco_supabase
    DB_DATABASE=postgres
    DB_PORT=5432 # Ou a porta específica fornecida pelo Supabase (ex: 6543 para o pooler em modo de sessão)

    # Outras variáveis (opcional, dependendo da configuração do seu app)
    # PORT=3000 # Porta para o servidor Node.js, se não definida usa 3000 por padrão no app.js
    ```
    **Importante:** Certifique-se de que as credenciais do Supabase estejam corretas, especialmente o `DB_HOST` e `DB_PASSWORD`.

## Configuração do Banco de Dados (Supabase)

O projeto inclui um script para criar automaticamente as tabelas e inserir alguns dados iniciais no seu banco de dados Supabase.

1.  **Certifique-se** de que seu arquivo `.env` está configurado corretamente com as credenciais do Supabase.
2.  Na raiz do projeto, execute o seguinte comando no terminal:
    ```bash
    npm run db:init
    ```
    Este comando executará o script `src/scripts/initDb.js`, que se conectará ao seu banco Supabase e rodará o `src/sql/schema.sql`. Verifique o console para mensagens de sucesso ou erro.

## Executando a Aplicação

### Modo de Desenvolvimento

Para rodar o servidor em modo de desenvolvimento (com reinicialização automática usando `nodemon`):
```bash
npm run dev
```
Para rodar o servidor em modo de produção:
```bash
npm start
```