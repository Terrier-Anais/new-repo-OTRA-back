import client from './pg.client.js';
import TripsDatamapper from './trips.datamapper.js';

// Ici on a choisi d'injecter le client db en instanciant les datamappers, on aurait le faire à la façon Sequelize en utilisant plutot des métjodes statiques et en injectant la connection graâce a une autre méthode statique de type (init())
export const tripsDatamapper = new TripsDatamapper(client);

