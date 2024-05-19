import { Model, DataTypes } from "sequelize";
import {sequelize} from "./sequelizeClient.js";

export class User extends Model {}

User.init(
  {
email: {
  type: DataTypes.STRING, 
  allowNull: false, 
  unique: true,
  // validate: {
  //   isEmail: true,
  //   },
    },
lastname: {
  type: DataTypes.STRING,
  allowNull: false,
    },
firstname: {
  type: DataTypes.STRING,
  allowNull: false,
    },
pseudo: {
  type: DataTypes.STRING,
    },
password: {
  type: DataTypes.STRING,
  allowNull: false,
    },
role_id: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "member",
    },
  },
  {
  sequelize,
  tableName: "user",
  }
);
