import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const authController = {
  async handleSignupFormSubmit(req, res) {
      const { email,lastname, firstname, pseudo, password } = req.body;
      // if (!email || !lastname || !firstname || !pseudo|| !password ) {
      //   return res.status(400).json({ error: error.message });
      // }
      // if (password !== confirmation) {
      //   return res.render("signin.html", {
      //     errorMessage: "Les mdp de sont pas identiques",
      //   });
      // }
      const existingUser = await User.findOne({
        where: {
          email,
        },
      });
      // if (existingUser) {
      //   return res.status("", {
      //     emailError: "Un utilisateur existe deja avec cette email",
      //   });
      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(password, salt);
      await User.create({
        email,
        lastname,
        firstname,
        pseudo,
        password: hash,
        role_id:1
      });
    // } catch (e) {
    //   console.log(e);
    //   res.status(500).render("500");
    // }
  },

  async handleLoginFormSubmit(req, res) {
    try {
      const { email, password } = req.body;
      // console.log(email, password);

      const user = await User.findOne({
        where: {
          email,
        },
      
      });
      
      if (!user) {
        return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '5h' });

      console.log("mon token", token);
      res.status(201).json({ message: 'Connexion réussie', token });
      res.cookie('token', token, { httpOnly: true, secure: true });
      res.send('Utilisateur authentifié et token stocké dans un cookie.');
      
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  },
  async tryCookie(req, res){
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send('Accès interdit. Token manquant.');
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send('Accès interdit. Token invalide.');
      }
      res.send(`Accès accordé. Bonjour, ${decoded.name}`);
    });
  }
};


export default authController;
