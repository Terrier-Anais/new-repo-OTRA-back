import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Trip extends Model {}

Trip.init({

  dateStart: {
    type: DataTypes.DATE,
    allowNull: false 
  },
  dateEnd: {
    type: DataTypes.DATE,
    allowNull: false 
  },
  photo: {
    type: DataTypes.STRING,
     },
title: {
    type: DataTypes.STRING,
      },
description: {
    type: DataTypes.STRING,
         },
note: {
    type: DataTypes.INTEGER,
     defaultValue: 3,
    },

}, {
  sequelize, // instance de connexion
  tableName: "trip"
});