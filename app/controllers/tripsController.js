// import Joi from "joi";
import {Trip, Visit, Place, User} from '../models/index.js';

// GET /api/me/trips
export async function getMyTrips(req, res) {
  // Trouver l'utilisateur par clé primaire (PK)
   const user = await User.findByPk(req.user.id);

  // Vérifier si l'utilisateur existe
  if (!user) {
    return res.status(404).send('User not found');
  }

  // Trouver tous les voyages associés à l'utilisateur
  const trips = await Trip.findAll({
    where: { user_id: user.id },
  });

  // Répondre avec les voyages trouvés
  res.status(200).json(trips);
}

// GET /api/me/trips/:id
export async function getVisitsForTrip(req, res) {
  const tripId = parseInt(req.params.id);

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

}

// POST /api/me/trips
export async function createTrip(req, res) {
  const {dateStart,dateEnd, photo, title, description, note, user_id } = req.body;
  console.log(req.body);


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