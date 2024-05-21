import { User } from "../models/index.js";
import bcrypt from "bcrypt";

const authController = {
  async handleSignupFormSubmit(req, res) {
    try {
      const { email,lastname, firstname, pseudo, password } = req.body;
      if (!email || !lastname || !firstname || !pseudo|| !password ) {
        return res.json("email,lastname, firstname, pseudo, password", {
          errorMessage: "Erreur de saisie",
        });
      }
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
      if (existingUser) {
        return res.status("", {
          emailError: "Un utilisateur existe deja avec cette email",
        });
      }
      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(password, salt);
      await User.create({
        email,
        lastname,
        firstname,
        pseudo,
        password: hash,
      });
    } catch (e) {
      console.log(e);
      res.status(500).render("500");
    }
  },

  // renderLogin(_, res) {
  //   res.sendFile("login.html");
  // },

  async handleLoginFormSubmit(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.sendFile("login.html", {
        errorMessage: "Mauvaise combinaison login/mot de passe",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.sendFile("login.html", {
        errorMessage: "Mauvaise combinaison login/mot de passe",
      });
    }
    req.session.userId = user.id;
    res.status("201").json();
  },

  // logout(req, res) {
  //   req.session.userID = null;
  //   res.redirect("/");
  // },
};


export default authController;
