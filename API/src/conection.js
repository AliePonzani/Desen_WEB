import mysql from 'mysql2/promise';
import 'dotenv/config';

let con;

try {
    con = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DB,
    });

    console.log('Conexão com BD realizada');
} catch (error) {
    console.error('Erro ao conectar ao banco de dados!', error.message);
}

export default con;
