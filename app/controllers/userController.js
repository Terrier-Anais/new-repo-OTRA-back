import { User, Trip, Visit } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userSchema from '../schema/user.create.schema.js';

const userController = {
  /**
   * 
   * @param {object}} req 
   * @param {object} res 
   */
async signUp(req, res){
    try {
        const { email, lastname, firstname, pseudo, password, confirmation } = req.body;
        const { error } = userSchema.validate({ email, lastname, firstname, pseudo, password, confirmation });

        if (error) {
          return res.status(400).json({ error: error.details[0].message });
      }
       
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Un utilisateur existe déjà avec cet email" });
        }

        const salt = await bcrypt.genSalt(15);
        const hash = await bcrypt.hash(password, salt);

        await User.create({
            email,
            lastname,
            firstname,
            pseudo,
            password: hash,
            role_id: 1
        });
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
},
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
async logIn(req, res){
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
    }
    console.log("mon user", user.id );
    
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '5h' });
    console.log("mon token", token);
    res.status(201).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
},
async getUser(req,res){
    // const thingObject = JSON.parse(req.body.thing);
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId);
    if (!user){
      return res.status(404).json({error: "Utilisateur non trouvé"})
    }
    res.json(user)
},
async updateUser(req, res){
      const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        const updatedData = req.body;
        if (updatedData.password) {
          updatedData.password = await bcrypt.hash(updatedData.password, 15);
        }
        await user.update(updatedData);
    
        res.status(200).json({ message: 'Profil mis à jour avec succès' });
},
async deleteUser(req,res){
      const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const trips = await Trip.findAll({ where: { user_id: userId } });
        for (const trip of trips) {
          await Visit.destroy({ where: { trip_id: trip.id } });
        }
        await Trip.destroy({ where: { user_id: userId } });
        await user.destroy();
          res.status(200).json({ message: 'Compte utilisateur supprimé avec succès' });
}
};

export default userController;