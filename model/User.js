// import {Model,Sequelize,DataTypes} from 'sequelize';
// import db from '../database.js';

// const Owner = db.define("owner", {
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     phoneNumber: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password:{
//        type: DataTypes.STRING,
//        allowNull: false
//     },
//     locality: {
//       type: DataTypes.STRING,
//     },
//     district: {
//       type: DataTypes.STRING,
//     }
//  });
 
//  db.sync().then(() => {
//     console.log('Owner table created successfully!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });

// export default Owner;















// class User extends Model {};

// User.init({
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
// },{
//     sequelize:db,
//     modelName:'user'
// })
// export default User;