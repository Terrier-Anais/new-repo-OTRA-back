// import Joi from "joi";
import {Visit} from '../models/Trip.js';

// GET /api/trips
export async function getMyVisits(req, res) {
  const visits = await Visit.findAll(
    {include: 'place'}   
  );
  console.log(visits);
  res.status(200).json(visits);
}

// GET /api/trips/:id
export async function getOneTrip(req, res) {
  const tripId = parseInt(req.params.id);
  
  try {
    const trip = await Trip.findByPk(tripId, {
      include: 'visits',
    });
    console.log(trip);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    res.json(trip);
  } catch (error) {
    // Gestion des erreurs en cas de problème avec la requête à la base de données
    res.status(500).json({ error: "An error occurred while retrieving the trip." });
  }
}





 // POST /api/trips
export async function createTrip(req, res) {
  const { startDate, endDate, photo, title, descritipon, note } = req.body;
  const trip = await Trip.create({
    startDate,
    endDate,
    photo,
    title,
    descritipon,
    note,
  });
  res.status(201).json(trip);
}

// PATCH /api/trips/:id
export async function updateTrip(req, res) {
  const tripId = parseInt(req.params.id);
  const trip = await Trip.findByPk(tripId);
  if (!trip) {
    return res.status(404).json({ error: "Trip not found." });
  }
  const { startDate, endDate, photo, title, description, note } = req.body;
  trip.startDate = start_date;
  trip.endDate = end_date;
  trip.photo = photo;
  trip.title = title;
  trip.description = description;
  trip.note = note;
  await trip.save();
  res.json(trip);
}

// DELETE /api/trips/:id  
export async function deleteTrip(req, res) {
  const tripId = parseInt(req.params.id);
  const trip = await Trip.findByPk(tripId);
  if (!trip) {
    return res.status(404).json({ error: "Trip not found." });
  }
  await trip.destroy();
  res.status(204).end();
}