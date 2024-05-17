import { pool } from '../app/datamappers/pg.client.js';


const data = require('./places.json');

const importData = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Insérer les informations du pays et du continent
    const countryInfo = {
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      continent: data.region
    };

    for (const state of data.states) {
      for (const city of state.cities) {
        const insertQuery = `
          INSERT INTO locations (city, city_latitude, city_longitude, country, country_latitude, country_longitude, continent)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        await client.query(insertQuery, [
          city.name,
          city.latitude,
          city.longitude,
          countryInfo.name,
          countryInfo.latitude,
          countryInfo.longitude,
          countryInfo.continent
        ]);
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
