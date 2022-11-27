import {response, Router} from "express";
// import User from '../model/User.js';
import {check,validationResult} from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
const UserRouter = Router();
// import db from "../database";

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
            return res.status(400).json({errors:errors.array() })
      
          }
          const {firstname,lastname,phoneNumber,email,password,locality,district} =req.body;
          // let user = await User.findOne({ where: { email:email } });

          if(user) throw new Error("Error creating account")  //To check if the user already exists
          // user=new User({firstname,lastname,phoneNumber,email,password,locality,district});
          console.log("user",user);
          const salt= await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
          const hash= await bcrypt.hash(user.password,salt);
          user.password=hash;
          console.log(user);
          let query=`Select * from owner where email=${email}`
          let db.query,(query,(err, results)=>
          {
            if(err)
          })
          // TODO save data await user.save();  
          // await db.query(
          //   `INSERT INTO table_name (column1, column2, column3) VALUES('${user.firstname}','${user.lastname}','${user.phoneNumber}','${user.email},'${user.password}','${user.locality}','${user.district}')`);
            // 'INSERT * FROM projects WHERE status = :status',
            // {
            //   replacements: { status: 'active' },
            //   type: QueryTypes.SELECT
            // }
          
          //  await User.create({firstName:user.firstName,lastName:user.lastName,phoneNumber:user.phoneNumber,email:user.email,password:user.password,locality:user.locality,district:user.district});
          console.log("user saved");  
          //res.status(201).json({msg: "Account created successfully!", accessToken: jwtToken, user: {_id: user._id, name: user.name, email: user.email,gender:user.gender,dob:user.dob}, errors: []})     
          res.status(201).json({msg: "Account created successfully!",  user: {_id: user._id,firstName:user.firstName,lastName:user.lastName,phoneNumber:user.phoneNumber,email:user.email,locality:user.locality,district:user.district}, errors: []})
   
        }
   catch(err)
   {
     console.log(err);
     return res.status(400).json({errors:[{msg: err.message}]});
   }
        
});


UserRouter.post('/login',[
    check("email").isEmail(),
    check("password").not().isEmpty(),
    check("password").isLength({min:6}),
],async(req,res) => {
  
    console.log("here"); 
    try
  {
  console.log(req.body);
  // res.header("Access-Control-Allow-Origin", "*");
  const errors = validationResult(req.body);
  
  if(!errors.isEmpty())
  {
    console.log(errors.array())
    return res.status(400).json({errors:errors.array() })
  }
  
  // const {name, phoneNumber, password} = req.body;
  const {email, password} = req.body;
  let user = await User.findOne({ where: { email:email } });
  if(user==null)
  {
    throw new Error("Invalid login details!");
  }
    if(await bcrypt.compare(password, user.password))
    {
      console.log("User loggged in: ", user._id, " ", new Date().toISOString()); 
      res.status(201).json({msg: "Logged in successfully!",  user: {_id: user._id,firstName: user.firstname, email: user.email}, errors: []}) 
    }
    else
    {
      throw new Error("Invalid login details!");
    }
}
  catch(err){
    console.log(err);
    return res.status(400).json({errors:[{msg: err.message}]});
  }
}
);


UserRouter.get('/home',(req,res) => {
    res.send([
        {
            id:1,
            name: 'jhon',
            age:32
        }
    ])});




export default UserRouter;    