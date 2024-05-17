const { Pool } = require('pg');
const pool = new Pool({
  // Vos paramètres de connexion
});

const jsonData = require('./chemin_vers_votre_fichier.json');

const importData = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Insérer les informations du continent et du pays une seule fois
    const continent = 'Europe'; // Exemple statique, ajustez selon votre logique
    const country = jsonData.name;
    const countryCode = jsonData.iso3;
    
    for (const state of jsonData.states) {
      for (const city of state.cities) {
        const insertQuery = `
          INSERT INTO localisations (continent, pays, code_pays, ville, latitude, longitude)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await client.query(insertQuery, [continent, country, countryCode, city.name, city.latitude, city.longitude]);
      }
    }
    
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

importData().catch(e => console.error(e.stack));

