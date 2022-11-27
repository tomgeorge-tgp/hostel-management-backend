import express from 'express';
// import db from "./database.js";
// import User from './model/User.js';
import http from 'http';
import bodyParser from 'body-parser';
// import cors from "cors";
import useAppRoutes from './routes/appRoutes.js';

const app = express();

// const corsOptions ={
//     origin:'*',
//     "access-control-allow-credentials":true,
    
//   }
//   var allowCrossDomain = function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type","Accept");
//     next();
//   };
//   app.use(allowCrossDomain);

//   app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  useAppRoutes(app);

// app.post('/api/owner',(req,res) => {
//     User.create(req.body).then(() => {
//         res.send('user is inserted');
//         console.log("here");
//         console.log(req.body);
        
// })});

// app.post('/user/login',(req,res) => {
//     // User.create(req.body).then(() => {
//     //     res.send('user is inserted');
//     //     
//     //     console.log(req.body);
//     console.log("here");  
// //}
// //)
// });
// app.get('/api/users',(req,res) => {
//     res.send([
//         {
//             id:1,
//             name: 'jhon',
//             age:32
//         }
//     ])});



// db.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });



  
const PORT = 5000;

const httpServer = http.createServer(app);
httpServer.listen(5000,()=>{console.log("Server started on port 5000")});

// app.listen(PORT,() => {
//     console.log(`Running on PORT ${PORT}`);
// });