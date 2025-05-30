import { Trip, Visit,User } from '../models/index.js';
import { tripIdSchema, createTripSchema, updateTripSchema } from '../schema/trip.schema.js';

const tripController = {
/**
 * Retrieve all trips associated with the authenticated user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {number} req.user.id - The ID of the authenticated user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * 
 */
async getTrips(req, res){
  const { error } = tripIdSchema.validate({ id: req.user.id });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).send('Utilisateur non trouvé.');
  }
// Find all trips associated with the user, including visits
  const trips = await Trip.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: Visit,
        as: 'visits',
        // include: [
        //   {
        //     model: Place,
        //     as: 'place',
        //   },
        // ],
      },
    ],
  });
  res.status(200).json(trips);
},
/**
 * Create a new trip.
 * 
 * @param {Object} req - The request object.
 * @param {string} req.body - The trip information.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
// POST /api/me/trips
async createTrip(req, res) {
  console.log(req.body);
  const { error, value } = createTripSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { dateStart, dateEnd, photo, title, description, note, user_id } = value;

  try {
    // Create a new trip
    const trip = await Trip.create({
      dateStart,
      dateEnd,
      photo,
      title,
      description,
      note,
      user_id,
    });
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du voyage.' });
  }
},
/**
 * Update an existing trip.
 * 
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The trip ID.
 * @param {string} req.body - The trip information.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
// PATCH /api/me/trips/:id
async updateTrip(req, res) {
  const tripId = parseInt(req.params.id);
  const trip = await Trip.findByPk(tripId);
  if (!trip) {
    return res.status(404).json({ error: "Trip not found." });
  }

  const { error, value } = updateTripSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { dateStart, dateEnd, photo, title, description, note } = value;

  if (dateStart !== undefined) trip.dateStart = dateStart;
  if (dateEnd !== undefined) trip.dateEnd = dateEnd;
  if (photo !== undefined) trip.photo = photo;
  if (title !== undefined) trip.title = title;
  if (description !== undefined) trip.description = description;
  if (note !== undefined) trip.note = note;

  await trip.save();
  res.json(trip);
},
/**
 * Delete an existing trip.
 * 
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The trip ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
// DELETE /api/me/trips/:id
async deleteTrip(req, res) {
  const { error } = tripIdSchema.validate({ id: req.params.id });
  if (error) {
    return res.status (400).json({ error: 'Invalid trip ID: ' + error.details[0].message });
  }

  const tripId = parseInt(req.params.id);
  const trip = await Trip.findByPk(tripId);
  if (!trip) {
    return res.status(404).json({ error: "Trip not found." });
  }
  try {
    await Visit.destroy({ where: { trip_id: tripId } });
    await trip.destroy();

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting trip:', err);
    res.status(500).json({ error: 'An error occurred while deleting the trip.' });
  }
},
/**
 * Retrieve all visits associated with a specific trip for the authenticated user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the trip.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
async getVisits(req, res) {
  // const { error } = tripIdSchema.validate({ id: req.params.id });
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }

  const tripId = parseInt(req.params.id);

  const trip = await Trip.findByPk(tripId, {
    include: [
      {
        model: Visit,
        as: 'visits'
      },
    ],
  });
  if (!trip) {
    return res.status(404).json({ error: "Le voyage n'a pas été retrouvé" });
  }
  res.json(trip);
},
// * Create a new visit.
// * 
// * @param {Object} req - The request object.
// * @param {string} req.body - The visit information.
// * @param {Object} res - The response object.
// * @returns {Promise<void>} - A promise that resolves to void.
// */

// POST /api/me/trips/:id/visit/
async createVisit(req, res) {
//   console.log(req.body);
//   const { error, value } = createTripSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

const { title, dateStart, dateEnd, comment,photo, note,geo, trip_id } = req.body;
 try {
   const visit = await Visit.create({
     title,
     dateStart,
     dateEnd,
     comment,
     photo,
     note,
     geo,
    //  place_id,
     trip_id,
   });
   res.status(201).json(visit);
 } catch (err) {
   res.status(500).json({ error: 'Une erreur est survenue lors de la création du voyage.' });
 }},
/**
* Update an existing visit.
* 
* @param {Object} req - The request object.
* @param {string} req.params.id - The visit ID.
* @param {string} req.body - The visit information.
* @param {Object} res - The response object.
* @returns {Promise<void>} - A promise that resolves to void.
*/

// PATCH /api/me/trips/:id/visit/:id
async updateVisit(req, res) {
 const { id } = req.params;
 const { title,dateStart, dateEnd, comment,photo, note, geo, trip_id } = req.body;

 try {
   const visit = await Visit.findByPk(id);
   if (!visit) {
     return res.status(404).json({ error: 'Visite non trouvée.' });
   }

   // Mettre à jour les champs de la visite
   visit.title = title !== undefined ? title : visit.title; 
   visit.dateStart = dateStart !== undefined ? dateStart : visit.dateStart;
   visit.dateEnd = dateEnd !== undefined ? dateEnd : visit.dateEnd;
   visit.comment = comment !== undefined ? comment : visit.comment;
   visit.note = note !== undefined ? note : visit.note;
   visit.photo = photo !== undefined ? photo : visit.photo;
   visit.geo = geo !== undefined ? geo : visit.geo;
  //  visit.place_id = place_id !== undefined ? place_id : visit.place_id;
   visit.trip_id = trip_id !== undefined ? trip_id : visit.trip_id;

   // Enregistrer les modifications
   await visit.save();

   res.status(200).json(visit);
 } catch (err) {
   console.error('Erreur lors de la mise à jour de la visite:', err);
   res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la visite.' });
 }
},
/**
* Delete an existing visit.
* 
* @param {Object} req - The request object.
* @param {string} req.params.id - The visit ID.
* @param {Object} res - The response object.
* @returns {Promise<void>} - A promise that resolves to void.
*/

// DELETE /api/me/trips/:id/visit/:id
async deleteVisit(req, res) {
//   const { error } = visitIdSchema.validate({ id: req.params.id });
//   if (error) {
//     return res.status (400).json({ error: 'Invalid visit ID: ' + error.details[0].message });
//   }

 const visitId = parseInt(req.params.id);
 const visit = await Visit.findByPk(visitId);
 if (!visit) {
   return res.status(404).json({ error: "Trip not found." });
 }
 await visit.destroy();
 res.status(200).json({ message: 'Visite supprimé avec succès' });
}
};

export default tripController;