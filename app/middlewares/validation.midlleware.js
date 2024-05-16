import Joi from 'joi';

// Middleware pour valider l'ID
function validateId(req, res, next) {
 
  const schema = Joi.object({
    id: Joi.number().integer().positive().required()
  });

  const { error } = schema.validate({ id: req.params.id });

  if (error) {
    return res.status(400).json({ message: 'Invalid ID', details: error.details });
  }
  return next();
}

function validateTrip(req, res, next) {
    const schema = Joi.object({
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        photo: Joi.string().uri().allow(''), // Permet les chaînes vides
        title: Joi.string().allow(''), // Permet les chaînes vides
        description: Joi.string().allow(''), // Permet les chaînes vides
        note: Joi.number().integer().min(0).max(5) // Note entre 0 et 5
      });
    
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Invalid trip', details: error.details });
  }
  return next();
}

export { validateId, validateTrip };