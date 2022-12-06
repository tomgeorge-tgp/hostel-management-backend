// import mysql from 'mysql2/promise';
// async function main() {
//     // get the client
//     // create the connection
//     const con = await mysql.createConnection({host:'localhost', user: 'root',password: 'Tomgeorge@1', database: 'hostel_management'});

//   }

//   export default ;


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







// // app.get('/createdb',(req,res)=>{
// //     let sql='CREATE DATABASE hostel_management';
// //     db.query(sql,(err,result)=>
// //     {
// //         if(err) throw err;
// //         console.log(result);

// //         res.send('Database created successfully');
// //     })
// // })

// // app.get('/createtable',(req,res)=>{
// //     let sql='CREATE TABLE user(id int AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255), password VARCHR(255) PRIMARY KEY (id))';
// //     db.query(sql,(err,result)=>
// //     {
// //         if(err) throw err;
// //         console.log(result);

// //         res.send('Table created successfully');
// //     })
// // })












// // import { Sequelize } from 'sequelize';
// // import SQLite from 'sqlite3';

// // const db = new Sequelize(
// //     'hostel_management',
// //  'root',
// //  'Tomgeorge@1',
// //  {
// //     host: '127.0.0.1',
// //     dialect: 'mysql'
// //   }
// // ,
// // );

// // export default db;




// // {
// //     dialect:'sqlite',
// //     storage:'../database/hostel.sqlite',
// //     dialectOptions: {
// //         mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
// //     }