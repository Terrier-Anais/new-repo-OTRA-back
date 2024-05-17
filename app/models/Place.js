
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Place extends Model {}

Place.init({

  city : {
    type: DataTypes.STRING,
    allowNull: false 
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  continent: {
    type: DataTypes.STRING,
    allowNull: false 
  },

}, {
  sequelize, // instance de connexion
  tableName: "place"
});

