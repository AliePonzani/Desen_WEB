import mysql from 'mysql2/promise';

let con;

try {
    con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Loja'
    })

    console.log('Conexão com BD realizada');
} catch (error) {
    console.error('Erro ao conectar ao banco de dados!', error.message);
}

export default con;
