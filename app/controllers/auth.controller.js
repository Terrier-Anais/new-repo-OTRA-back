import { User } from "/models";
import bcrypt from "bcrypt";
// import emailValidator from "email-validator";
// 


export default authController = {
  async renderSignup(req, res) {
    res.render("signup");
  },
// renvoie de la liaison front

  async handleSignupFormSubmit(req, res) {
    try {
      const {email, lastname, firstname, pseudo, password} = req.body;
      if (!email ||!lastname ||!firstname||!pseudo|| !password) {
        return res.render("signup", {
          errorMessage: "Merci de renseigner tout les champs obligatoires",
        });
      }
// comparaison à l'api mail
      // if (!emailValidator.validate(email)) {
      //   return res.render("signup", {
      //     emailError: "Email invalide",
      //   });
      // }

      // Guard : Les deux mdp doivent etre identiques
      // if (password !== confirmation) {
      //   return res.render("signup", {
      //     errorMessage: "Les mdp de sont pas identiques",
      //   });
      // }
      const existingUser = await User.findOne({
        where: {
          email, // equivalent à email:email
        },
      });
      if (existingUser) {
        return res.render("signup", {
          emailError: "Un utilisateur existe deja avec cette email",
        });
      }
// hashage du mots de passe
      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(password, salt);
      await User.create({
        email,
        lastname,
        firstname,
        pseudo,
        password: hash,
      });

      res.redirect("/login");
    } catch (e) {
      console.log(e);
      res.status(500).render("500");
    }
  },

  renderLogin(_, res) {
    res.render("login");
  },

  async handleLoginFormSubmit(req, res) {
    const { email, password } = req.body;

    console.log(email, password);
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.render("login", {
        errorMessage: "Mauvaise combinaison login/mot de passe",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        errorMessage: "Mauvaise combinaison login/mot de passe",
      });
    }
    req.session.userId = user.id;
    res.redirect("/");
  },

  logout(req, res) {
    req.session.userID = null;
    res.redirect("/");
  },
};

