// src/config/db.js
const path = require('path'); // Certifique-se que 'path' está importado

// Carrega variáveis de ambiente do arquivo .env localizado na raiz do projeto
// __dirname aqui é 'C:\Users\Inteli\Documents\GitHub\Projeto-Individual-Modulo-2\src\config'
// Então '../../.env' aponta para 'C:\Users\Inteli\Documents\GitHub\Projeto-Individual-Modulo-2\.env'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Pool } = require('pg');

// Log para depuração ANTES de criar o Pool
console.log('[DB_CONFIG] Tentando carregar variáveis de ambiente:');
console.log(`[DB_CONFIG] DB_USER: ${process.env.DB_USER}`);
console.log(`[DB_CONFIG] DB_HOST: ${process.env.DB_HOST}`);
console.log(`[DB_CONFIG] DB_DATABASE: ${process.env.DB_DATABASE}`);
console.log(`[DB_CONFIG] DB_PORT: ${process.env.DB_PORT}`);
console.log(`[DB_CONFIG] DB_PASSWORD (tipo): ${process.env.DB_PASSWORD}`);
// CUIDADO: Não logue a senha inteira em produção. Apenas para depuração local e temporária:
// console.log(`[DB_CONFIG] DB_PASSWORD (valor): ${process.env.DB_PASSWORD}`); 
// Alternativa mais segura para verificar se existe:
console.log(`[DB_CONFIG] DB_PASSWORD (existe e é string?): ${typeof process.env.DB_PASSWORD === 'string' && process.env.DB_PASSWORD.length > 0}`);


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD, // AQUI É O PONTO CRÍTICO
    port: parseInt(process.env.DB_PORT || "5432", 10),
    ssl: {
        rejectUnauthorized: false // Para Supabase
    }
});

pool.on('connect', () => {
    console.log('[DB_POOL] Cliente conectado ao PostgreSQL via pool!');
});

pool.on('error', (err, client) => {
    console.error('[DB_POOL] Erro inesperado no cliente da pool ociosa:', err);
    // process.exit(-1); // Comentar esta linha durante o desenvolvimento pode ser útil para não derrubar o server a cada erro de pool
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    // Se precisar do pool diretamente em algum outro lugar (ex: para fechar no initDb.js, embora lá criamos um pool separado)
    // getPool: () => pool
};