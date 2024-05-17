
import { Model, DataTypes } from "sequelize";
import {sequelize} from "./sequelize-client";

export class User extends Model {}

User.init(
  {
    email: {
        type: DataTypes.STRING, // VARCHAR(255)
        allowNull: false, // Interdiction d'avoir en BDD un utilisateur sans email
        unique: true, // Interdiction d'avoir en BDD 2 utilisateurs avec le même email
        validate: {
          isEmail: true,
        },
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

    role: {
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
