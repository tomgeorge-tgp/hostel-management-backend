import {response, Router} from "express";
// import User from '../model/User.js';
import {check,validationResult} from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
const UserRouter = Router();
// import db from "../database";
import db from "../database.js";
import { v4 as uuidv4 } from 'uuid';
import { SELECTCON ,SELECT } from "../query/index.js";
//const mysql = require('mysql2/promise');
dotenv.config();


UserRouter.post('/signup',[
    check("firstname").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("phoneNumber").not().isEmpty(),
    check("phoneNumber").isMobilePhone('any'),
    check("email").isEmail(),
    check("password").not().isEmpty(),
    check("password").isLength({min:6}),
],async(req,res) => {
   try{
          console.log(req.body);
          const errors=validationResult(req.body);
          if(!errors.isEmpty())
          {
            console.log(errors.array())
            res.status(400).json({errors:errors.array() })
      
          }
          const {firstName,lastName,phoneNumber,email,password,locality,district,imageUrl} =req.body;
          let query = SELECTCON("users", {
           email,
          });
          console.log(query);
          db.query(query,async (err,result) => {
            console.log(err);
            if(result.length>0) {return res.status(409).json({msg: "user already exists"});}
            else{
              let user={_id:uuidv4(),first_name:firstName,last_name:lastName,phone_number:phoneNumber,email:email,password:password,locality:locality,district:district,image_url:imageUrl};
              const salt= await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
              const hash= await bcrypt.hash(user.password,salt);
              user.password=hash;
              console.log(user);
              query = `insert into users(_id,first_name,last_name,phone_number,email,password,locality,district,image_url) values (?,?,?,?,?,?,?,?,?)`;
              db.query(query,[user._id,user.first_name,user.last_name,user.phone_number,user.email,user.password,user.locality,user.district,user.image_url],(err,result)=>{

                if(err) {res.status(400).json({msg:"user not registered!"});}
                else{
                  console.log(result);
                  console.log("user saved");  
                  res.status(201).json({msg: "Account created successfully!",  user: {_id: user._id,firstName:user.first_name,lastName:user.last_name,phoneNumber:user.phone_number,email:user.email,locality:user.locality,district:user.district,imageUrl:user.image_url}, errors: []})

                }

            });
      
       
          }
        });
      }      
   catch(err)
   {
     console.log(err);
    res.status(400).json({errors:[{msg: err.message}]});
   }
        
});


UserRouter.post('/login',[
    check("email").isEmail(),
    check("password").not().isEmpty(),
    check("password").isLength({min:6}),
],async(req,res) => {
  
    //console.log("here"); 
    try
  {
 // console.log(req.body);
  // res.header("Access-Control-Allow-Origin", "*");
  const errors = validationResult(req.body);
  
  if(!errors.isEmpty())
  {
    console.log(errors.array())
    return res.status(400).json({errors:errors.array() })
  }
  
  // const {name, phoneNumber, password} = req.body;
  const {email, password} = req.body;
  let query = SELECTCON("users", {
    email,
   });
   //console.log("query",query);
   db.query(query,async (err,result) => {
    if(result.length>0) {

      if(await bcrypt.compare(password, result[0].password))
      {
        console.log("User loggged in: ", result[0]._id, " ", new Date().toISOString()); 
        res.status(201).json({msg: "Logged in successfully!",  user: {_id:result[0]._id,firstName: result[0].first_name, email: result[0].email}, errors: []}) 
      }
      else
      {
        throw new Error("Invalid login details!");
      }
    }
    else{
      return res.status(409).json({msg: "User not Signed Up"})
  }
})
  }
  catch(err){
    console.log(err);
    return res.status(400).json({errors:[{msg: err.message}]});
  }
}
);




UserRouter.get('/:id',(req,res) => {
  console.log(req.params.id);
  const _id = req.params.id;
  let query = SELECTCON("users", {
    _id,
   });
   console.log("query",query);
   db.query(query,async (err,result) => {
    console.log("result",result);
    if(err) {res.status(400).json({msg:"user not registered!"});}
    else{
      console.log(result); 
      res.status(201).json({msg: "user there",  user: {_id: result[0]._id,firstName:result[0].first_name,lastName:result[0].last_name,phoneNumber:result[0].phone_number,email:result[0].email,locality:result[0].locality,district:result[0].district,imageUrl:result[0].image_url}, errors: []})

    }
   });
    //if(result.length>0) {
    // res.send([
    //     {
    //         id:1,
    //         name: 'jhon',
    //         age:32
    //     }
    // ])
  });

UserRouter.post('/update',(req,res) => {

   let name='tom';
   
   const {firstName,lastName,phoneNumber,email,password,locality,district,imageUrl} =req.body;
   let user={first_name:firstName,last_name:lastName,phone_number:phoneNumber,locality:locality,district:district,image_url:imageUrl};
   let query = `update  users set ?  where email='${email}'`;
   db.query(query,[{first_name:user.first_name,last_name:user.last_name,phone_number:user.phone_number,locality:user.locality,district:user.district,image_url:user.image_url}],(err,result)=>{
     if(err) throw err;
     console.log(result);
     res.status(202).json({msg: "user updated", errors: []})
    });
  


      // res.send([
      //     {
      //         id:1,
      //         name: 'jhon',
      //         age:32
      //     }
      // ])});    

    })

    UserRouter.delete('/delete/:id',(req,res) => {
      console.log(req.params.id);
      let query =`delete from users where _id=?`;
          db.query(query, [req.params.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.status(202).json({msg: "user deleted", errors: []}) 
        });
    })


// #data = req.body.id












export default UserRouter;    