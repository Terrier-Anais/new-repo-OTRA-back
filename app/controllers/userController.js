import { User, Trip, Visit } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userSchema from '../schema/user.create.schema.js';

const userController = {
 /**
   * User registration handler
   * @param {object} req - The request object
   * @param {object} res - The response object
   */
async signUp(req, res){
    try {
        const { email, lastname, firstname, pseudo, password, confirmation } = req.body;
        // Validate request body schema
        const { error } = userSchema.validate({ email, lastname, firstname, pseudo, password, confirmation });
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
      }
       // Check if a user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Un utilisateur existe déjà avec cet email" });
        }
        // Hash the password before storing
        const salt = await bcrypt.genSalt(15);
        const hash = await bcrypt.hash(password, salt);
        // Create a new user
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
   * User login handler
   * @param {object} req - The request object
   * @param {object} res - The response object
   */
async logIn(req, res){
  try {
    // Find user by email
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
    }
    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
    }
    console.log("mon user", user.id );
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '5h' });
    console.log("mon token", token);
    res.status(201).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
},

/**
   * Get user by ID
   * @param {object} req - The request object
   * @param {object} res - The response object
   */
async getUser(req,res){
    // Find user by primary key (ID)
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId);
    if (!user){
      return res.status(404).json({error: "Utilisateur non trouvé"})
    }
    res.json(user)
},

/**
   * Update user by ID
   * @param {object} req - The request object
   * @param {object} res - The response object
   */
async updateUser(req, res){
      const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        const updatedData = req.body;
        // If password is being updated, hash the new password
        if (updatedData.password) {
          updatedData.password = await bcrypt.hash(updatedData.password, 15);
        }
        await user.update(updatedData);
    
        res.status(200).json({ message: 'Profil mis à jour avec succès' });
},

 /**
   * Delete user by ID
   * @param {object} req - The request object
   * @param {object} res - The response object
   */
async deleteUser(req,res){
      const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
      // Find and delete all trips and visits associated with the user
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
