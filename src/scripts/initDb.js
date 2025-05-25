// src/scripts/initDb.js
const fs = require('node:fs');
const path = require('node:path');
const { Pool } = require('pg');

// Carrega variáveis de ambiente do arquivo .env na raiz do projeto
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

async function initializeDatabase() {
    // Configuração da conexão com o banco de dados Supabase
    const dbConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || "5432", 10),
        ssl: {
            rejectUnauthorized: false // Supabase geralmente requer SSL.
                                     // Para produção, considere configurações SSL mais seguras,
                                     // como fornecer o certificado CA do Supabase.
        }
    };

    // Verifica se as configurações básicas do banco estão presentes
    if (!dbConfig.password || !dbConfig.host || !dbConfig.user || !dbConfig.database) {
        console.error(
            'ERRO: As variáveis de ambiente do banco de dados (DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT) não estão configuradas corretamente no arquivo .env.'
        );
        console.error(
            'Certifique-se de que seu arquivo .env está na raiz do projeto e contém as credenciais do Supabase válidas.'
        );
        process.exit(1); // Termina o script com código de erro
    }

    const pool = new Pool(dbConfig);
    let client; // Declara o client fora do try para que possa ser acessado no finally

    console.log('Tentando conectar ao banco de dados Supabase para inicialização...');

    try {
        client = await pool.connect();
        console.log('Conectado com sucesso ao banco de dados Supabase!');

        // Caminho para o seu arquivo schema.sql
        const sqlFilePath = path.join(__dirname, '../sql', 'schema.sql'); // O script está em src/scripts, o SQL em src/sql
        
        console.log(`Lendo script SQL de: ${sqlFilePath}`);
        const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

        console.log('Executando script SQL para criar tabelas e inserir dados iniciais...');
        await client.query(sqlScript); // PostgreSQL (e a lib 'pg') suporta executar múltiplas instruções de uma vez

        console.log('Script SQL executado com sucesso! Tabelas criadas e dados iniciais inseridos no Supabase.');

    } catch (err) {
        console.error('ERRO durante a inicialização do banco de dados no Supabase:');
        console.error(`  Mensagem: ${err.message}`);
        if (err.code) { // Códigos de erro do PostgreSQL são úteis
            console.error(`  Código do Erro PG: ${err.code}`);
        }
        if (err.stack) {
            // console.error(`  Stack: ${err.stack}`); // Pode ser muito verboso, descomente se precisar
        }
        
        // Se o erro for 'tabela já existe' (código 42P07), é um aviso em vez de um erro crítico para este script
        if (err.code === '42P07') {
            console.warn('AVISO: Uma ou mais tabelas especificadas no script já existem no banco de dados.');
            console.warn('Nenhuma alteração foi feita nas tabelas existentes devido a este erro.');
        } else {
            process.exitCode = 1; // Define o código de saída como erro para outros tipos de falha
        }

    } finally {
        if (client) {
            await client.release();
            console.log('Cliente do banco de dados liberado.');
        }
        // Fecha o pool de conexões, pois este script é de uso único
        await pool.end();
        console.log('Pool de conexões com o Supabase fechado.');
    }
}

// Executa a função de inicialização
initializeDatabase()
    .then(() => {
        if (process.exitCode === 1) {
            console.log("Inicialização do banco de dados concluída com erros.");
        } else {
            console.log("Inicialização do banco de dados concluída com sucesso.");
        }
    })
    .catch(err => {
        // Este catch é para erros não tratados dentro de initializeDatabase ou erros na própria função
        console.error('ERRO CATASTRÓFICO ao tentar inicializar o banco de dados:', err);
        process.exit(1);
    });