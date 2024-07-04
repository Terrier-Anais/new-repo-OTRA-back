import { Model, DataTypes } from "sequelize";
import {sequelize} from "./sequelizeClient.js";

export class Visit extends Model {}

Visit.init({
title:{
  type: DataTypes.STRING,
  allowNull: false,
  },
dateStart: {
  type: DataTypes.DATE,
  allowNull: false 
  },
dateEnd: {
  type: DataTypes.DATE,
  allowNull: false 
  },
comment: {
  type: DataTypes.STRING,
  allowNull: true,
  },
note: {
  type: DataTypes.INTEGER,
  defaultValue: 3,
  },
photo: {
    type: DataTypes.STRING,
    },
geo:{
      type: DataTypes.STRING,
      allowNull: true,
      },
trip_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'trip',
    key: 'id',
  }
},

}, {
  sequelize,
  tableName: "visit"
});









