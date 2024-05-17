// Importer nos modèles
import { Visit } from "./Visit.js";
import { Place } from "./Place.js";
import { Role } from "./Role.js";
import { Trip } from "./Trip.js"; // Assurez-vous d'importer Trip si vous l'utilisez
import { User } from "./User.js"; // Assurez-vous d'importer User si vous l'utilisez
import { sequelize } from "./sequelizeClient.js";

// Trip <--> Visit (One-to-Many)
Trip.hasMany(Visit, {
  as: "visits",
  foreignKey: {
    name: "trip_id",
  },
  onDelete: "CASCADE"
});
Visit.belongsTo(Trip, {
  as: "trip",
  foreignKey: "trip_id"
});

// User <--> Trip (One-to-Many)
User.hasMany(Trip, {
  as: "trips",
  foreignKey: {
    name: "user_id",
  },
  onDelete: "CASCADE"
});
Trip.belongsTo(User, {
  as: "user",
  foreignKey: "user_id" 
});

// User <--> Role (One-to-many)
Role.hasMany(User, {
  as: "users",
  foreignKey: {
    name: "role_id"
 },
  onDelete: "CASCADE"
}),
User.belongsTo(Role, {
  as: "role",
    foreignKey: {
    name: "role_id", 
    allowNull: false
    },
    onDelete: "CASCADE"
});

// Visit <--> Place (One-to-One)
Place.hasOne(Visit, {
  as: "visit",
  foreignKey: {
    name: "place_id",
    allowNull: false
  },
  onDelete: "CASCADE"
}),
  Visit.belongsTo(Place, {
    as: "place",
    foreignKey: "place_id",
    allowNull: false
  });


// Exporter nos modèles
export { Visit, Place, Role, Trip, User, sequelize};