# 📚 Sistema de Reserva de Salas

Este projeto é uma aplicação web para **gerenciamento de reservas de salas**, criada como projeto individual para o módulo 2

## 💡 Descrição do Sistema

A aplicação permite que alunos realizem reservas de salas de estudo de forma virtual, substituindo a necessidade de fazer isso presencialmente na secretaria.  
O sistema mostra as salas disponíveis em horários fixos e permite realizar reservas por data.

### Funcionalidades
- Login e cadastro de usuários (alunos)
- Visualização de salas disponíveis
- Escolha de horários e datas
- Reserva com verificação de conflitos
- Mensagens de erro e validação de acesso

---

## 📁 Estrutura de Pastas
PROJETO-INDIVIDUAL-MODULO-2/
│
├── documentos/                  # Documentação do projeto
│   └── Projeto Individual.md
│
├── node_modules/                # Dependências instaladas via npm
│
├── src/                         # Código-fonte da aplicação
│   ├── assets/                  # Imagens, fontes e arquivos estáticos
│   ├── config/                  # Configuração do banco de dados e variáveis
│   ├── controllers/             # Lógica de controle das requisições
│   ├── models/                  # Estrutura dos dados e integração com o banco
│   ├── routes/                  # Definição das rotas
│   ├── services/                # Regras de negócio e serviços auxiliares
│   ├── styles/                  # CSS da aplicação
│   └── tests/                   # Testes automatizados
│
├── .env                         # Variáveis de ambiente reais (NÃO versionar)
├── .gitignore                   # Arquivos ignorados pelo Git
├── jest.config.js              # Configuração de testes com Jest
├── package.json                 # Dependências e scripts do projeto
├── package-lock.json            # Versões travadas das dependências
├── server.js                    # Inicialização do servidor Express
└── README.md                    # Documentação principal do projeto


---

## ▶️ Como executar o projeto localmente

### 1. Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL
- Git

---

### 2. Clonar o repositório

```bash
git clone https://github.com/joaocardosodias/Projeto-Individual-Modulo-2.git
cd Projeto-Individual-Modulo-2
```
---
### 3.Instale as dependências
```bash
npm install
```
---
### 4.Inicie o servidor
```bash
npm start
```
---
### 5.Acesse o navegador
Abra o navegador e acesse:
http://localhost:3000





