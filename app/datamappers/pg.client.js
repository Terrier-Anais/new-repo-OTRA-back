import pg from 'pg';
const { Client } = pg;

const client = new Client({
    user: 'spedata',      
    host: 'localhost',            
    database: 'oroad',            
    password: 'pgadmin', 
    port: 5432,
});
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));
  
export default client;


