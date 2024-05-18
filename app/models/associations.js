// Importer nos modèles
import { Visit } from "./Visit.js";
import { Role } from "./Role.js";
import { Trip } from "./Trip.js"; 
import { User } from "./User.js"; 
import { Place } from "./Place.js";
import { sequelize } from "./sequelizeClient.js";

// Trip <--> Visit (One-to-Many)
Trip.hasMany(Visit, {
  as: "visits",
  foreignKey: {
  name: "trip_id",
  },
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
 }),
User.belongsTo(Role, {
  as: "role",
  foreignKey: {
  name: "role_id", 
  allowNull: false
  },
  });

// Visit <--> Place (One-to-One)
Place.hasOne(Visit, {
  as: "visit",
  foreignKey: {
  name: "place_id",
  allowNull: false
  },
  }),
  Visit.belongsTo(Place, {
  as: "place",
  foreignKey: "place_id",
  allowNull: false
  });


// Exporter nos modèles
export { Visit, Place, Role, Trip, User, sequelize};