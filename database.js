import sqlite3 from 'sqlite3';

const datbase = new sqlite3.Database('./database.sqlite');


const initializeDB = async () => {
    await datbase.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            whichClass TEXT
        )
    `);
    console.log('Adatbázis elkészült.');
};

function dbQuery(sql, params = []){
    return new Promise((resolve, reject) => {
        datbase.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

function dbRun(sql, params = []){
    return new Promise((resolve, reject) => {
        datbase.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    })
}

export {datbase, initializeDB, dbQuery, dbRun};