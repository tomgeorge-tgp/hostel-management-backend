import {response, Router} from "express";
// import User from '../model/User.js';
import {check,validationResult} from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const HostelRouter = Router();
// import db from "../database";
import db from "../database.js";
import { v4 as uuidv4 } from 'uuid';
import { SELECTCON,SELECT } from "../query/index.js";

HostelRouter.post('/',async(req,res) => {
   try{   
          console.log("here");
          console.log(req.body);
          
         
          
          const {name,_id_owner,category,address,city,singleBed,doubleBed,tripleBed,imageUrl} =req.body;
        //   let query = SELECTCON("hostel", {
           
        //   });
         // console.log(query);
        //   db.query(query,async (err,result) => {
        //     console.log(err);
        //     if(result.length>0) {return res.status(409).json({msg: "user already exists"});}
        //     else{
              let hostel={_id:uuidv4(),name:name,_id_owner:_id_owner,category:category,Address:address,City:city,no_one_bed:singleBed,no_two_bed:doubleBed,no_three_bed:tripleBed,image_url:imageUrl};
             
              
              console.log(hostel);
             let query = `insert into hostel(_id,name,_id_owner,category,Address,City,no_one_bed,no_two_bed,no_three_bed,img_url) values (?,?,?,?,?,?,?,?,?,?)`;
              console.log("query", query);
              db.query(query,[hostel._id,hostel.name,hostel._id_owner,hostel.category,hostel.Address,hostel.City,hostel.no_one_bed,hostel.no_two_bed,hostel.no_three_bed,hostel.image_url],(err,result)=>{
                if(err) {console.log(err);
                    res.status(400).json({msg:"hostel not registered!"});}
                else{
                  console.log(result);
                  console.log("hostel saved");  
                  res.status(201).json({msg: "hostel registered successfully!",  user: {_id:hostel._id,name:hostel.name,idOwner:hostel._id_owner,category:hostel.category,Address:hostel.Address,City:hostel.City,no_one_bed:hostel.no_one_bed,no_two_bed:hostel.no_two_bed,no_three_bed:hostel.no_three_bed,image_url:hostel.image_url}, errors: []})
                }

            });
      
       
          }
   catch(err)
   {
     console.log(err);
    res.status(400).json({errors:[{msg: err.message}]});
   }
        
});

HostelRouter.get('/:id',(req,res) => {
    console.log(req.params.id);
    const _id_owner = req.params.id;
    let query = SELECTCON("hostel", {
      _id_owner,
     });
     console.log("query",query);
     db.query(query,async (err,result) => {
      console.log("result",result);
      if(err) {res.status(400).json({msg:"user not registered!"});}
      else{
        console.log(result); 
        res.status(201).json({msg: "user there",  hostels: [...result], errors: []})
  
      }
     });
    }
);

HostelRouter.delete('/:id',(req,res) => {
    console.log(req.params.id);
    const _id = req.params.id;
    let query =`delete from hostel where _id=?`;
    db.query(query, [req.params.id], (err, result) => {
      if (err){
      console.log(err);
       throw err;
      }
      console.log(result);
      res.status(202).json({msg: "hostel deleted", errors: []}) 
  });
   
    }
);

HostelRouter.put('/',(req,res) => {


    console.log(req.body);
    const {_id,_id_owner,name,Address,City,no_one_bed,no_two_bed,no_three_bed,imageUrl} =req.body;
    let hostel={_id:_id,_id_owner:_id_owner,name:name,Address:Address,City:City,no_one_bed:no_one_bed,no_two_bed:no_two_bed,no_three_bed:no_three_bed,imageUrl:imageUrl};
    let query = `update  hostel set ?  where _id='${_id}'`;
    db.query(query,[{_id:_id,_id_owner:_id_owner,name:name,Address:Address,City:City,no_one_bed:no_one_bed,no_two_bed:no_two_bed,no_three_bed:no_three_bed,img_url:imageUrl}],(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.status(202).json({msg: "hostel updated", errors: []})
     });
   
 
 
       // res.send([
       //     {
       //         id:1,
       //         name: 'jhon',
       //         age:32
       //     }
       // ])});    
 
     })


     HostelRouter.get('/',(req,res) => {
        //console.log(req.params.id);
       // const _id = req.params.id;
        let query = SELECT('hostel');
         console.log("query",query);
         db.query(query,async (err,result) => {
          console.log("result",result);
          if(err) {res.status(400).json({msg:"Hostel data not send!"});}
          else{
            console.log(result); 
            res.status(201).json({msg: "Hostels data",  hostels:result });
      
          }
         });
        });




export default HostelRouter;    
