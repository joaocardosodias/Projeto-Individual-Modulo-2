-- Criação do banco de dados
CREATE DATABASE StudyHub_database;

-- Conecta-se ao banco de dados recém-criado
\connect StudyHub_database;

-- Criação da tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela de salas   
CREATE TABLE salas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL
);

-- Criação da tabela de blocos de horário
CREATE TABLE blocos_horario (
    id SERIAL PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL
);

-- Criação da tabela de reservas
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
    bloco_id INTEGER REFERENCES blocos_horario(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    UNIQUE (sala_id, bloco_id, data)
);

-- Inserção das salas
INSERT INTO salas (codigo) VALUES 
('R01'), ('R02'), ('R03'), ('R04'),
('R05'), ('R06'), ('R07'), ('R08');

-- Inserção dos blocos de horário
INSERT INTO blocos_horario (hora_inicio, hora_fim) VALUES
('08:00', '10:00'),
('10:00', '12:00'),
('12:00', '14:00'),
('14:00', '16:00');