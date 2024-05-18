// import Joi from "joi";
import {Trip} from '../models/Trip.js';
import { Visit } from '../models/Visit.js';
// import { Place } from '../models/Visit.js';

// GET /api/me/trips
export async function getMyTrips(req, res) {
  const trips = await Trip.findAll();
  res.status(200).json(trips);
}

// GET /api/me/trips/:id
export async function getOneTrip(req, res) {
  const tripId = parseInt(req.params.id);
  console.log(tripId);
  const trip = await Trip.findByPk(tripId, 
    // {
    //   include: {
    //     association: "visits",
    //   },
    // }
    );
  if (!trip) {
    return res.status(404).json({ error: "Trip not found." });
  }
  res.json(trip);
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