# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Nome do Projeto
### StudyHub
## Autor do projeto
### João Cardoso Dias

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O atual processo de reserva de salas no Inteli exige que alunos e professores se dirijam pessoalmente à secretaria para solicitar agendamentos. Esse método manual gera desafios significativos: dificuldade em verificar disponibilidades, perda de tempo com deslocamentos e limitações devido aos horários de atendimento. Além disso, a falta de um sistema centralizado torna complicado o gerenciamento dos espaços, levando a conflitos de agendamento e subutilização das salas.

Este projeto propõe uma solução digital para simplificar e modernizar o processo de reserva. A plataforma permitirá que os usuários consultem a disponibilidade das salas em tempo real, realizem agendamentos de forma rápida e gerenciem suas reservas conforme a necessidade. Com uma interface intuitiva, será possível visualizar os horários livres, selecionar o espaço desejado e receber confirmação imediata, tudo de maneira autônoma e sem burocracia.


O objetivo principal é tornar o processo mais eficiente, eliminando barreiras desnecessárias e proporcionando maior autonomia aos usuários. Ao substituir o método manual por uma solução digital, o Inteli dará um passo importante na modernização de seus processos internos, alinhando-se às necessidades de sua comunidade acadêmica. A plataforma não apenas resolverá problemas imediatos, como também servirá como base para futuras melhorias na gestão de espaços e recursos compartilhados.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)
A criação de personas, conforme Cooper et al. (2007), não se limita à simples elaboração de perfis fictícios, mas constitui um processo estratégico que transforma dados de pesquisa em representações tangíveis dos usuários. Essa abordagem foi fundamental no desenvolvimento do StudyHub, onde a persona "Rafael Souza" emergiu não como uma mera personificação abstrata, mas como uma síntese cuidadosa das observações sobre o comportamento real dos alunos - seus hábitos de estudo, frustrações com o sistema atual e necessidades não atendidas.

Essa materialização das personas ganha ainda mais relevância quando consideramos o alerta de Pruitt e Adlin (2006) sobre os riscos do design baseado em suposições. No projeto do Inteli, a persona de Lucas serviu como bússola em momentos decisivos: quando a equipe debatia entre desenvolver uma solução mobile-first ou priorizar a versão desktop, foi o entendimento profundo da rotina acelerada de Lucas - que precisa agendar salas entre aulas usando principalmente o celular - que direcionou a escolha para o mobile. Dessa forma, a persona deixou de ser apenas uma referência passiva para se tornar um agente ativo no processo de tomada de decisão.

A eficácia desse método encontra sua comprovação nos estudos de Nielsen (2012), que correlaciona diretamente o uso de personas bem construídas com a qualidade final da experiência do usuário. No caso do Inteli, essa relação tornou-se visível quando o sistema em desenvolvimento começou a antecipar necessidades que nem mesmo os próprios alunos haviam verbalizado claramente - como a funcionalidade de "reserva relâmpago" para intervalos curtos entre aulas, inspirada na análise minuciosa dos padrões de comportamento da persona Lucas. Assim, o que começou como uma ferramenta de design transformou-se no próprio mecanismo que assegurou a adesão espontânea dos usuários ao novo sistema.

---
<div style="text-align: center; margin-bottom: 1em;">
    <p style="margin-bottom: 0.3em; font-style: italic;"><strong>Figura 1</strong> – Representação de uma persona
    <img src="../assets/personas.png" style="max-width: 100%; height: auto; margin: 0.5em 0;">
    <p style="margin-top: 0.3em; font-size: 0.9em; font-style: italic;">
        Fonte:Produção Autoral.
    </p>
</div>

### 2.2. User Stories (Semana 01)

A elaboração de user stories, conforme proposto por Cohn (2004), vai além da simples listagem de requisitos - ela estabelece um diálogo contínuo entre as necessidades dos usuários e as soluções técnicas. No projeto do Sistema de Reserva de Salas do Inteli, esse conceito se materializou quando transformamos observações do cotidiano acadêmico (como a correria entre aulas para reservar espaços) em narrativas estruturadas. A user story "Como Lucas, quero ver salas disponíveis num relance para aproveitar intervalos entre aulas" não apenas definiu uma funcionalidade, mas capturou um padrão comportamental crítico dos alunos.

Essa abordagem encontra eco nos princípios de Jeffries e Anderson (2001), que defendem user stories como unidades vivas de comunicação, não como documentos estáticos. Durante as iterações do projeto no Inteli, cada user story funcionou como um pacto colaborativo: enquanto a equipe técnica garantia que "reservas com um clique" fossem viáveis, os usuários validavam que a solução realmente economizava seu tempo. Esse feedback contínuo permitiu que histórias inicialmente simples, como "cancelar reservas", evoluíssem para fluxos mais robustos que consideravam conflitos de horário e notificações automáticas.

O verdadeiro poder dessa metodologia, como sintetiza Rubin (2012), revela-se quando as user stories passam a formar um sistema orgânico de prioridades. No caso do Inteli, a conexão entre histórias aparentemente isoladas - como "visualizar disponibilidade", "fazer reservas rápidas" e "gerenciar agendamentos" - mostrou-se fundamental para criar uma experiência coesa. O sistema resultante não apenas resolveu problemas individuais, mas transformou todo o ecossistema de reservas, provando que user stories bem articuladas são a base para produtos que realmente compreendem e servem seus usuários.

---
| Elemento        | Descrição                                                                 |
|-----------------|---------------------------------------------------------------------------|
| **ID**         | US01                                                                     |
| **Título**     | Visualização de disponibilidade                                          |
| **Persona**    | Rafael Souza (aluno do 3° período)                                      |
| **Como**       | Aluno que precisa agendar salas para trabalhos em grupo                 |
| **Quero**      | Ver disponibilidade das salas em tempo real                             |
| **Para**       | Planejar meus estudos sem precisar ir à secretaria                      |
| **Critérios**  | 1. Lista salas filtradas por data/horário<br>2. Mostra status visual (livre/ocupado)<br>3. Permite pré-selecionar intervalo |
| **Prioridade** | Alta (Core do MVP)                                                      |


| Atributo INVEST | Aplicação na US01                                                                 | Justificativa                                                                 |
|-----------------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| **I**ndependente | Funcionalidade completa que não depende de outras US para funcionar                | Pode ser implementada mesmo sem o sistema de reserva estar completo           |
| **N**egociável  | Detalhes da interface podem ser ajustados (tipo de calendário, cores dos status)   | O essencial é mostrar disponibilidade, a forma pode variar                    |
| **V**aliosa     | Resolve a principal dor do Lucas (saber se a sala está livre sem deslocamento)     | Economiza tempo e dá autonomia ao aluno                                       |
| **E**stimável   | Complexidade bem delimitada (~3 dias de desenvolvimento)                           | Requer apenas: lista de salas + lógica de disponibilidade + interface simples |
| **S**mall       | Escopo contido (pode ser entregue em 1 sprint)                                     | Funcionalidade focada sem sub-itens complexos                                 |
| **T**estável    | Critérios de aceite claros e verificáveis                                          | Pode-se testar: filtros funcionam? Status visualizado corretamente?           |

---
| Campo               | Descrição                                                                 |
|---------------------|---------------------------------------------------------------------------|
| **ID**              | US02                                                                     |
| **Título**          | Reserva rápida                                                           |
| **Persona**         | Rafael Souza (com prazo apertado)                                        |
| **Como**            | Aluno precisando agendar sala urgentemente                               |
| **Quero**           | Reservar uma sala em poucos passos pelo celular                          |
| **Para**            | Não perder tempo com deslocamento até a secretaria                       |
| **Critérios Aceite** | - Fluxo máximo de 3 etapas<br>- Campos mínimos obrigatórios<br>- Confirmação imediata |
| **Prioridade**      | Média                                                                     |
---
| Campo               | Descrição                                                                 |
|---------------------|---------------------------------------------------------------------------|
| **ID**              | US03                                                                     |
| **Título**          | Gerenciamento de reservas                                                |
| **Persona**         | Rafael Souza (com planos alterados)                                      |
| **Como**            | Aluno que precisa reorganizar agendas                                    |
| **Quero**           | Cancelar ou modificar minhas reservas existentes                         |
| **Para**            | Me adaptar a mudanças no cronograma do grupo                             |
| **Critérios Aceite** | - Lista minhas reservas ativas<br>- Cancelamento com 1h antecedência<br>- Notificação por e-mail |
| **Prioridade**      | Média                                                                     |

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)


<div style="text-align: center; margin-bottom: 1em;">
    <p style="margin-bottom: 0.3em; font-style: italic;"><strong>Figura 2</strong> – Representação do diagrama de modelos relacionais</p>
    <img src="../assets/diagramabancodedados.png" style="max-width: 100%; height: auto; margin: 0.5em 0;">
    <p style="margin-top: 0.3em; font-size: 0.9em; font-style: italic;">
        Fonte:Produção Autoral.
    </p>
</div>



<div style="text-align: center; margin-bottom: 1em;">
    <p style="margin-bottom: 0.3em; font-style: italic;"><strong>Figura 3</strong> – Representação do arquivo  .sql </p>
    <img src="../assets/modelo-banco.png" style="max-width: 100%; height: auto; margin: 0.5em 0;">
    <p style="margin-top: 0.3em; font-size: 0.9em; font-style: italic;">
        Fonte:Produção Autoral.
    </p>
</div>





#

### 3.1.1 BD e Models (Semana 5)

A camada de **Model** no projeto StudyHub é responsável por toda a interação direta com o banco de dados PostgreSQL. Ela abstrai as consultas SQL, fornecendo uma interface clara e segura para que os Controllers possam manipular os dados sem conhecer os detalhes da implementação do banco.

Esta camada garante a integridade e a lógica de acesso aos dados, servindo como a ponte entre a lógica de negócio da aplicação e a persistência de dados. Foram implementados dois Models principais: `userModel.js` e `reservationModel.js`.

#### 1. userModel.js

Este model é responsável por gerenciar todas as operações relacionadas à entidade de Usuário. Ele interage diretamente com a tabela `usuarios` do banco de dados.

**Objetivo:** Prover funcionalidades para o cadastro e a autenticação de usuários, como a criação de novos registros e a busca por usuários existentes.

##### Métodos Implementados:

###### `create({ nome, email, senha_hash })`
- **Descrição:** Insere um novo usuário na tabela `usuarios`. Este método recebe um objeto com os dados do usuário, incluindo a senha já processada (hasheada) pelo `authController`.
- **Uso no Sistema:** É o método central da funcionalidade de Cadastro.
- **Retorno:** Retorna o objeto do usuário recém-criado (com id, nome, e email), confirmando que a operação foi bem-sucedida.

###### `findByEmail(email)`
- **Descrição:** Realiza uma busca na tabela `usuarios` por um registro que corresponda ao e-mail fornecido.
- **Uso no Sistema:** É um método crucial e utilizado em dois momentos:
  1. No **Cadastro**, para verificar se o e-mail que o usuário está tentando cadastrar já existe no sistema, evitando duplicidade.
  2. No **Login**, para encontrar o usuário correspondente ao e-mail informado e, posteriormente, verificar sua senha.
- **Retorno:** Retorna o objeto completo do usuário encontrado ou `undefined` caso nenhum usuário com aquele e-mail exista.

#### 2. reservationModel.js

Este é o model mais complexo da aplicação, responsável por toda a lógica de negócio relacionada a Reservas. Ele interage primariamente com a tabela `reservas`, mas também realiza JOINs com as tabelas `salas` e `blocos_horario` para obter informações completas.

**Objetivo:** Gerenciar a criação, consulta e modificação de reservas, além de fornecer dados sobre a disponibilidade das salas.

##### Métodos Implementados:

###### `findActiveByUser(userId)`
- **Descrição:** Busca no banco de dados todas as reservas de um usuário específico (`userId`) que ainda estão ativas, ou seja, aquelas cuja data é igual ou posterior ao dia atual e cujo status é 'ativa'.
- **Uso no Sistema:** Utilizado para popular a seção "Reservas Ativas" no dashboard do usuário.
- **Retorno:** Retorna um array de objetos, onde cada objeto representa uma reserva ativa com detalhes da sala e horário.

###### `findPastByUser(userId)`
- **Descrição:** Busca todas as reservas passadas de um usuário. Isso inclui reservas com datas anteriores ao dia atual ou cujo status não seja mais 'ativa' (ex: 'cancelada', 'realizada').
- **Uso no Sistema:** Utilizado para popular a seção "Histórico de Reservas" no dashboard.
- **Retorno:** Retorna um array com o histórico de reservas do usuário.

###### `cancel(reservationId, userId)`
- **Descrição:** Atualiza o status de uma reserva para 'cancelada'. Este método é seguro, pois a consulta SQL verifica se o `reservationId` pertence ao `userId` que está fazendo a solicitação e se a reserva ainda está com o status 'ativa', impedindo que um usuário cancele reservas de outros ou reservas que já foram finalizadas.
- **Uso no Sistema:** É o método central da funcionalidade de Cancelar Reserva.
- **Retorno:** Retorna o objeto da reserva atualizada se o cancelamento for bem-sucedido, ou `undefined` caso contrário.

###### `create({ usuario_id, sala_id, data_reserva, bloco_id })`
- **Descrição:** Insere um novo registro na tabela `reservas`, efetivamente criando uma nova reserva para um usuário.
- **Uso no Sistema:** É o passo final do fluxo de Nova Reserva.
- **Detalhe Importante:** Este método se beneficia da CONSTRAINT de UNIQUE definida no banco de dados para a combinação de (`sala_id`, `data_reserva`, `bloco_id`). Se um usuário tentar criar uma reserva que já existe, o banco de dados retornará um erro de violação de unicidade (código 23505), que o método captura e transforma em uma mensagem de erro amigável para o usuário ("Este horário para esta sala já está reservado.").

###### `getAvailabilityForRoom(sala_id, year, month)`
- **Descrição:** Realiza uma consulta mais complexa para determinar quais dias de um determinado mês e ano já estão com todos os blocos de horário reservados para uma sala específica.
- **Uso no Sistema:** É a base da funcionalidade interativa do calendário na página de Nova Reserva. O frontend usa os dados retornados para desabilitar visualmente os dias em que não é mais possível fazer reservas.
- **Retorno:** Retorna um array de números, representando os dias do mês que estão totalmente ocupados.

###### Observação sobre Outras Tabelas:

As tabelas `salas` e `blocos_horario`, por serem mais simples e utilizadas principalmente para consulta (lookup), não possuem um arquivo de Model dedicado. As consultas a essas tabelas são realizadas diretamente no `reservationController` para otimizar e simplificar a estrutura do projeto.

### 3.2. Arquitetura (Semana 5)



A arquitetura do StudyHub segue uma variação do padrão Model-View-Controller (MVC), adaptada para uma aplicação web moderna com backend em Node.js e frontend desacoplado.

#### Componentes da Arquitetura

- **Model**: A camada de lógica e acesso a dados, representada pelos arquivos em `src/models/`. Ela se comunica exclusivamente com o banco de dados PostgreSQL.
- **View**: A camada de apresentação, composta pelos arquivos HTML em `src/views/` e os arquivos estáticos (CSS, JavaScript do cliente, imagens) em `src/public/`. Tudo isso é renderizado no navegador do usuário.
- **Controller**: O cérebro da aplicação, representado pelos arquivos em `src/controllers/`. Ele recebe as requisições da View, utiliza os Models para manipular dados e retorna as respostas adequadas.

#### Diagrama de Fluxo (Login de Usuário)

```
+--------------------------------+
|          👤 Usuário             |
+--------------------------------+
             |
             v  1. Interage com a interface (preenche formulário, clica em botões)
             |
.--------------------------------------.
|          VIEW (Navegador)            |
|   (HTML, CSS, JavaScript do Cliente) |
'--------------------------------------'
             |
             v  2. Requisição HTTP (ex: POST /api/auth/login com dados)
             |
.--------------------------------------.
|   CONTROLLER (Node.js / Express)     |
|   (Recebe a requisição, chama o      |
|    Middleware de Autenticação se     |
|    necessário, e orquestra a ação)   |
'--------------------------------------'
             |
             v  3. Chama a função apropriada do Model (ex: User.findByEmail)
             |
.--------------------------------------.
|             MODEL                    |
|   (Contém a lógica de negócio e as   |
|    consultas para o banco de dados)  |
'--------------------------------------'
             |
             v  4. Executa a consulta SQL (ex: SELECT * FROM ...)
             |
.--------------------------------------.
| BANCO DE DADOS (PostgreSQL/Supabase) |
|   (Armazena e recupera os dados)     |
'--------------------------------------'
             |
             v  5. Retorna o resultado da consulta para o Model
             |
.--------------------------------------.
|             MODEL                    |
|   (Processa os dados e retorna para   |
|    o Controller)                     |
'--------------------------------------'
             |
             v  6. Retorna os dados processados para o Controller
             |
.--------------------------------------.
|      CONTROLLER                      |
|   (Processa o resultado, gera uma    |
|    resposta HTTP - ex: Token JWT)    |
'--------------------------------------'
             |
             v  8. Envia a resposta HTTP (ex: JSON com Token) de volta para a View
             |
.--------------------------------------.
|          VIEW (Navegador)            |
|   (Recebe a resposta, atualiza a     |
|    interface, redireciona o usuário) |
'--------------------------------------'
             |
             v  9. A interface é atualizada para o usuário
             |
+--------------------------------+
|          👤 Usuário             |
+--------------------------------+

```
### 3.3. Wireframes (Semana 03)

Wireframes são representações visuais simplificadas da estrutura de uma interface, geralmente utilizadas nas etapas iniciais do design de produtos digitais. Eles descrevem o layout de uma página sem se preocupar com detalhes estéticos, focando apenas na organização dos elementos e na hierarquia da informação. Segundo Garrett (2011), os wireframes são essenciais para mapear como o usuário interage com o sistema, permitindo antecipar problemas de usabilidade e otimizar a navegação.

A principal importância dos wireframes está na sua capacidade de facilitar a comunicação entre designers, desenvolvedores e stakeholders. Eles funcionam como um guia visual que alinha expectativas e reduz retrabalho, permitindo validar a lógica e o fluxo das interfaces antes da implementação técnica (Krug, 2014). Além disso, wireframes servem como uma base para testes iniciais de usabilidade e feedback de usuários, contribuindo para soluções mais eficientes e centradas no usuário.


<div style="text-align: center; margin-bottom: 1em;">
    <p style="margin-bottom: 0.3em; font-style: italic;"><strong>Figura 3</strong> – Representação do  Wireframe</p>
    <img src="../assets/wireframe.png" style="max-width: 100%; height: auto; margin: 0.5em 0;">
    <p style="margin-top: 0.3em; font-size: 0.9em; font-style: italic;">
        Fonte:Produção Autoral.
    </p>
</div>

#### Telas da Aplicação

A aplicação é composta por três telas principais:

##### 1. Tela de Login
Nesta primeira etapa, o usuário deve inserir suas credenciais para acessar sua conta.

##### 2. Tela de Histórico de Reservas
Após o login, o usuário visualiza suas reservas anteriores e tem acesso a um botão para agendar uma nova reserva.
##### 3. Tela de Nova Reserva
Nesta tela, o usuário poderá escolher a sala desejada, selecionar a data e o horário para concluir a reserva.


### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)



Esta documentação descreve todos os endpoints da API RESTful do sistema StudyHub. A API é responsável por toda a comunicação entre o frontend (cliente no navegador) e o backend (servidor Node.js).

#### **Convenções Gerais**
* **URL Base:** Todas as rotas são prefixadas com `/api`.
* **Autenticação:** Rotas protegidas requerem um Token JWT válido, que deve ser enviado no cabeçalho (`header`) da requisição da seguinte forma:
    `Authorization: Bearer <seu-token-jwt>`
* **Formato de Dados:** Todas as requisições e respostas que contêm um corpo de dados utilizam o formato JSON.

---
#### Endpoints de Autenticação
**Rota Base:** `/api/auth`

Estes endpoints gerenciam o cadastro e o login de usuários.

##### **`POST /api/auth/register`**
* **Descrição:** Registra um novo usuário no sistema.
* **Autenticação:** Pública.
* **Corpo da Requisição (Request Body):**
    ```json
    {
        "nome": "string",
        "email": "string",
        "senha": "string"
    }
    ```
* **Resposta de Sucesso (`201 Created`):**
    ```json
    {
        "message": "Usuário cadastrado com sucesso!",
        "userId": 1
    }
    ```
* **Respostas de Erro:**
    * `400 Bad Request`: Se algum dos campos (`nome`, `email`, `senha`) estiver faltando.
    * `409 Conflict`: Se o e-mail fornecido já estiver em uso.

---
##### **`POST /api/auth/login`**
* **Descrição:** Autentica um usuário existente e retorna um token de acesso.
* **Autenticação:** Pública.
* **Corpo da Requisição (Request Body):**
    ```json
    {
        "email": "string",
        "senha": "string"
    }
    ```
* **Resposta de Sucesso (`200 OK`):**
    ```json
    {
        "message": "Login bem-sucedido!",
        "token": "seu.token.jwt.aqui"
    }
    ```
* **Respostas de Erro:**
    * `400 Bad Request`: Se `email` ou `senha` estiverem faltando.
    * `401 Unauthorized`: Se as credenciais (e-mail ou senha) forem inválidas.

---
#### Endpoints de Reservas
**Rota Base:** `/api/reservations`

Estes endpoints gerenciam a criação, visualização e cancelamento de reservas, além de dados relacionados como salas e horários.

##### **`GET /api/reservations/active`**
* **Descrição:** Retorna a lista de reservas ativas (data atual ou futura) para o usuário autenticado.
* **Autenticação:** Protegida (Requer Token JWT).
* **Resposta de Sucesso (`200 OK`):**
    ```json
    [
        {
            "id": 1,
            "data_reserva": "2025-06-10T03:00:00.000Z",
            "status": "ativa",
            "sala_codigo": "R01",
            "hora_inicio": "08:00:00",
            "hora_fim": "10:00:00"
        }
    ]
    ```
* **Respostas de Erro:**
    * `401 Unauthorized`: Se o token for inválido ou não for fornecido.

---
##### **`GET /api/reservations/past`**
* **Descrição:** Retorna o histórico de reservas (passadas, canceladas ou realizadas) para o usuário autenticado.
* **Autenticação:** Protegida (Requer Token JWT).
* **Resposta de Sucesso (`200 OK`):**
    * *Formato do array similar ao de reservas ativas.*
* **Respostas de Erro:**
    * `401 Unauthorized`: Se o token for inválido ou não for fornecido.

---
##### **`POST /api/reservations`**
* **Descrição:** Cria uma nova reserva para o usuário autenticado.
* **Autenticação:** Protegida (Requer Token JWT).
* **Corpo da Requisição (Request Body):**
    ```json
    {
        "sala_id": 1,
        "data_reserva": "2025-06-15",
        "bloco_id": 2
    }
    ```
* **Resposta de Sucesso (`201 Created`):**
    ```json
    {
        "message": "Reserva criada com sucesso!",
        "reservation": {
            "id": 5,
            "usuario_id": 1,
            "sala_id": 1,
            "data_reserva": "2025-06-15T03:00:00.000Z",
            "bloco_id": 2,
            "status": "ativa"
        }
    }
    ```
* **Respostas de Erro:**
    * `400 Bad Request`: Se algum dos campos obrigatórios estiver faltando.
    * `401 Unauthorized`: Se o token for inválido.
    * `409 Conflict`: Se a sala já estiver reservada para aquela data e horário.

---
##### **`PATCH /api/reservations/:id/cancel`**
* **Descrição:** Cancela uma reserva ativa específica. O `:id` na URL deve ser o ID da reserva a ser cancelada.
* **Autenticação:** Protegida (Requer Token JWT).
* **Resposta de Sucesso (`200 OK`):**
    ```json
    {
        "message": "Reserva cancelada com sucesso!",
        "reservation": {
            "id": 1,
            "status": "cancelada",
            "..."
        }
    }
    ```
* **Respostas de Erro:**
    * `401 Unauthorized`: Se o token for inválido.
    * `404 Not Found`: Se a reserva não existir, não pertencer ao usuário ou não estiver mais ativa.

---
#### Endpoints de Suporte (Dados para Formulários)

##### **`GET /api/reservations/rooms`**
* **Descrição:** Retorna uma lista de todas as salas disponíveis para reserva.
* **Autenticação:** Protegida (Requer Token JWT).
* **Resposta de Sucesso (`200 OK`):**
    ```json
    [
        { "id": 1, "codigo": "R01" },
        { "id": 2, "codigo": "R02" }
    ]
    ```
* **Respostas de Erro:**
    * `401 Unauthorized`: Se o token for inválido.

---
##### **`GET /api/reservations/time-blocks`**
* **Descrição:** Retorna uma lista de todos os blocos de horário padrão.
* **Autenticação:** Protegida (Requer Token JWT).
* **Resposta de Sucesso (`200 OK`):**
    ```json
    [
        { "id": 1, "hora_inicio": "08:00:00", "hora_fim": "10:00:00" },
        { "id": 2, "hora_inicio": "10:00:00", "hora_fim": "12:00:00" }
    ]
    ```
* **Respostas de Erro:**
    * `401 Unauthorized`: Se o token for inválido.

---
##### **`GET /api/reservations/availability`**
* **Descrição:** Verifica os dias em um determinado mês/ano que estão totalmente reservados para uma sala específica.
* **Autenticação:** Protegida (Requer Token JWT).
* **Parâmetros de Query (Query Params):**
    * `sala_id` (obrigatório): O ID da sala a ser verificada.
    * `year` (obrigatório): O ano a ser verificado.
    * `month` (obrigatório): O mês a ser verificado (1 para Janeiro, 2 para Fevereiro, etc.).
    * Exemplo de URL: `/api/reservations/availability?sala_id=1&year=2025&month=6`
* **Resposta de Sucesso (`200 OK`):**
    ```json
    [15, 22, 28]
    ```
    *(Neste exemplo, os dias 15, 22 e 28 do mês consultado estão totalmente ocupados.)*
* **Respostas de Erro:**
    * `400 Bad Request`: Se algum dos parâmetros de query estiver faltando.
    * `401 Unauthorized`: Se o token for inválido.

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

COHN, M. *User stories applied: for agile software development*. Boston: Addison-Wesley, 2004.

COOPER, A. et al. *About face 3: the essentials of interaction design*. Indianapolis: Wiley, 2007.

JEFFRIES, R.; ANDERSON, A. *Extreme programming installed*. Boston: Addison-Wesley, 2001.

NIELSEN, J. *Usability engineering*. San Francisco: Morgan Kaufmann, 2012.

PRUITT, J.; ADLIN, T. *The persona lifecycle: keeping people in mind throughout product design*. San Francisco: Morgan Kaufmann, 2006.

RUBIN, K. S. *Essential Scrum: a practical guide to the most popular agile process*. Boston: Addison-Wesley, 2012.
Garrett, J. J. (2011). The Elements of User Experience: User-Centered Design for the Web and Beyond. New Riders.

Krug, S. (2014). Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability. New Riders.


---