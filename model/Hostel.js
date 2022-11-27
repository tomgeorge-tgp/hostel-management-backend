import {Model,Sequelize,DataTypes} from 'sequelize';
import db from '../database.js';

const Hostel = db.define("hostel", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    three_bed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    two_bed: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      one_bed:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
    Owner_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
    }
 });
 
 db.sync().then(() => {
    console.log('Hostel table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

export default Hostel;















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