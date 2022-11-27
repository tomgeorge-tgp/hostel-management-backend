import mysql from "mysql2";

const db=mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Tomgeorge@1',
        database: 'hostel_management',
    }
);

db.connect((error) => {
    if(!error)
    console.log('Connection has been established successfully.');
   
    else
    console.error('Unable to connect to the database: ', error);
  });


export default db;

















// import { Sequelize } from 'sequelize';
// import SQLite from 'sqlite3';

// const db = new Sequelize(
//     'hostel_management',
//  'root',
//  'Tomgeorge@1',
//  {
//     host: '127.0.0.1',
//     dialect: 'mysql'
//   }
// ,
// );

// export default db;




// {
//     dialect:'sqlite',
//     storage:'../database/hostel.sqlite',
//     dialectOptions: {
//         mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
//     }