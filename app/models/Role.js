import { Model, DataTypes } from "sequelize";
import {sequelize} from "./sequelize-client";

export class Role extends Model {}

Role.init({
name: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "member"
  }
}, {
  sequelize,
  tableName: "role"
});