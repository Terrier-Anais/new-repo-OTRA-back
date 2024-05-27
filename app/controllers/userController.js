import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

const userController = {
  async getUser(req,res){
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
          await user.destroy();
          res.status(200).json({ message: 'Compte utilisateur supprimé avec succès' });
    }
    };

export default userController;