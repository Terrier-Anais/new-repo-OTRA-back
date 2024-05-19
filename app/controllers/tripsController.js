// import Joi from "joi";
import {Trip, Visit, Place} from '../models/index.js';


// GET /api/me/trips
export async function getMyTrips(req, res) {
  const userId = parseInt(req.params.id);
  const trips = await Trip.findAll({
    where: { user_id: userId },
  }
  );
  res.status(200).json(trips);
}

// GET /api/me/trips/:id
export async function getVisitsForTrip(req, res) {
  const tripId = parseInt(req.params.id);

  try {
    const trip = await Trip.findByPk(tripId, {
      include: [
        {
          model: Visit,
          as: 'visits', 
          include: [
            {
              model: Place,
              as: 'place', 
            }
          ],
        },
      ],
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found.' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Erreur lors de la récupération des visites pour le voyage :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// POST /api/me/trips
export async function createTrip(req, res) {
  const {dateStart,dateEnd, photo, title, description, note, user_id } = req.body;
  console.log(req.body);

  try {
    const trip = await Trip.create({
      dateStart, 
      dateEnd, 
      photo,
      title,
      description,
      note,
      user_id
    });
    res.status(201).json(trip);
  } catch (error) {
    // Gérer l'erreur si la création échoue
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}



// PATCH /api/me/trips/:id
export async function updateTrip(req, res) {
  const tripId = parseInt(req.params.id);
  const trip = await Trip.findByPk(tripId);
  if (!trip) {
    return res.status(404).json({ error: "Trip not found." });
  }
  const { dateStart,dateEnd, photo, title, description, note } = req.body;
  trip.dateStart = dateStart;
  trip.dateEnd = dateEnd;
  trip.photo = photo;
  trip.title = title;
  trip.description = description;
  trip.note = note;
  await trip.save();
  res.json(trip);
}

//DELETE /api/me/trips/:id
export async function deleteTrip(req, res){
  const tripId = parseInt(req.params.id);
  const trip = await Trip.findByPk(tripId);
  if (!trip) {
    return res.status(404).json({ error: "Trip not found." });
  }
  await trip.destroy();
}