import Joi from "joi";
import {Trip, Visit, Place} from '../../../models/index.js';



// GET /api/trips
export async function getMyTrips(req, res) {
    const trips = await Trip.findAll({
    });
    res.status(200).json(trips);
}

// GET /api/trips/:id
export async function getOneTrip(req, res) {
  const tripId = parseInt(req.params.id);
     const trip = await Trip.findByPk(tripId, {
      include: [{ association: "visits" }, { association: "Place" }]
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    res.json(trip);
 }

 // POST /api/trips
export async function createTrip(req, res) {
  const { start_date, end_date, photo, title, descritipon, note } = req.body;
  const trip = await Trip.create({
    start_date,
    end_date,
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
  const { start_date, end_date, photo, title, description, note } = req.body;
  trip.start_date = start_date;
  trip.end_date = end_date;
  trip.photo = photo;
  trip.title = title;
  trip.description = description;
  trip.note = note;
  await trip.save();
  res.json(trip);
}