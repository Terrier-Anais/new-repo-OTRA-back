import pg from 'pg';

const { Pool } = pg;

// Assurez-vous que les variables d'environnement sont chargées
// par exemple avec le package dotenv si vous êtes en développement
require('dotenv').config();

const client = new Pool({
  connectionString: process.env.PG_URL
});

export default client;
