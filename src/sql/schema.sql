-- Cria a tabela de usuários do sistema (alunos)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,                        -- Identificador único automático para cada usuário
    nome VARCHAR(100) NOT NULL,                 -- Nome do aluno
    email VARCHAR(100) UNIQUE NOT NULL,         -- E-mail único para login
    senha_hash TEXT NOT NULL                    -- Senha armazenada de forma segura (hash)
);

-- Cria a tabela de salas disponíveis para reserva
CREATE TABLE salas (
    id SERIAL PRIMARY KEY,                        -- ID único da sala
    codigo VARCHAR(10) UNIQUE NOT NULL          -- Código da sala (ex: R01, R02...) - não pode se repetir
);

-- Cria as blocos de horário fixos disponíveis para reserva
CREATE TABLE blocos_horario (
    id SERIAL PRIMARY KEY,                        -- ID do bloco de horário
    hora_inicio TIME NOT NULL,                  -- Horário de início do bloco (ex: 08:00)
    hora_fim TIME NOT NULL                      -- Horário de término do bloco (ex: 10:00)
);

-- Cria a tabela de reservas feitas pelos alunos
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,                                              -- ID único da reserva
    usuario_id INTEGER REFERENCES usuarios(id)                          -- Referência ao aluno que fez a reserva
        ON DELETE CASCADE,                                              -- Se o usuário for deletado, a reserva também será
    sala_id INTEGER REFERENCES salas(id)                                -- Referência à sala reservada
        ON DELETE CASCADE,                                              -- Se a sala for deletada, a reserva também será
    data_reserva DATE NOT NULL,                                         -- Data da reserva (ex: 2025-05-01)
    bloco_id INTEGER REFERENCES blocos_horario(id)                      -- Referência ao horário reservado
        ON DELETE CASCADE,                                              -- Se o bloco for deletado, a reserva também será
    status VARCHAR(20) DEFAULT 'ativa',                                 -- Status da reserva (ativa, cancelada, etc.)

    -- Garante que não haverá duas reservas para a mesma sala, data e horário
    CONSTRAINT reserva_unica_por_bloco UNIQUE (sala_id, data_reserva, bloco_id)
);
INSERT INTO salas (codigo) VALUES
('R01'),
('R02'),
('R03'),
('R04'),
('R05'),
('R06'),
('R07'),
('R08'),
('R09'),
('R10');
INSERT INTO blocos_horario (hora_inicio, hora_fim) VALUES
('08:00:00', '10:00:00'),
('10:00:00', '12:00:00'),
('12:00:00', '14:00:00'),
('14:00:00', '16:00:00');
INSERT INTO usuarios (nome, email, senha_hash) VALUES
('Aluno Teste', 'aluno@inteli.edu.br', '$2a$10$K4NVjDcpeOVtCO9C.Yx.Uu1X.m0jBGh9fiskkYwO7fcv7Y37gHcTe');