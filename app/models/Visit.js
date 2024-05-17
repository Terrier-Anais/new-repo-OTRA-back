import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";


export class Visit extends Model {}

Visit.init({
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
            allowNull: false,
        },
      comment: {
            type: DataTypes.STRING,
            allowNull: true,
            },
     note: {
            type: DataTypes.INTEGER,
            defaultValue: 3,
            },

}, {
  sequelize, // instance de connexion
  tableName: "visit"
});

