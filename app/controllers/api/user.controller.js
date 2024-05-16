// const { User } = require("../models");
// Création user en bdd et liaison 

// const emailValidator = require("email-validator");
// 
const bcrypt = require("bcrypt");

const authController = {
  async renderSignup(req, res) {
    res.render("signup");
  },
// renvoie de la liaison front

  async handleSignupFormSubmit(req, res) {
    try {
      const { firstname, lastname, password, email, confirmation } = req.body;

      // Reflexe important : avant d'enregistrer l'utilisateur on teste nos données (Never trust user input)
      // Guard : Les valeurs sont bien présente
      if (!firstname || !lastname || !password || !email || !confirmation) {
        // En cas d'erreur, je render la page de signup mais avec une variable d'erreur
        return res.render("signup", {
          errorMessage: "Merci de renseigner tout les champs obligatoires",
        });
      }

      // Guard : Le format de l'email doit etre xxx@xx.xx
      if (!emailValidator.validate(email)) {
        return res.render("signup", {
          emailError: "Email invalide",
        });
      }

      // Guard : Les deux mdp doivent etre identiques
      if (password !== confirmation) {
        return res.render("signup", {
          errorMessage: "Les mdp de sont pas identiques",
        });
      }

      // Guard : L'email doit etre unique
      // On cherche si un utilisateur avec cette email existe deja
      const existingUser = await User.findOne({
        where: {
          email, // equivalent à email:email
        },
      });

      // Si il y en as deja un, on retourne une erreur
      if (existingUser) {
        return res.render("signup", {
          emailError: "Un utilisateur existe deja avec cette email",
        });
      }

      // On ne veux pas enregistrer le MDP en claire. Mais on veux enregistré son 'emprunte' (ou son 'hash')
      // Pour ça on hash le mdp avec bcrypt

      // On hash le mot de passe avec le sel

      // Etape 1 : On prepare le sel
      const salt = await bcrypt.genSalt(15); // Plus ce numéro est élévé, moin l'algo de hash est rapide en general on choisi au alentour de 10 /15

      // Etape 2 : On hash avec le sel
      const hash = await bcrypt.hash(password, salt);

      // On enregistre l'utilisateur en BDD
      // Create a new user
      await User.create({
        firstname,
        lastname,
        email,
        password: hash,
      });

      // Une fois l'utilisateur créé on redirige vers la page de login (pour l'instant la homepage)
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
    // Il nous reste a vérifié qu'il existe bien un utilisateur correspondant
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Si aucun utilisateur ne porte cette email, je retourne une erreur
    if (!user) {
      return res.render("login", {
        errorMessage: "Mauvaise combinaison login/mot de passe",
      });
    }

    // L'utilisateur existe bien, on verifie maintenant que son mdp est bon
    // Pour ça, on s'appuie sur la methode de comparaison de bcrypt qui va
    // Se charger de comparer le mdp en clair avec hash salé stocké en base de donnée
    const isMatch = await bcrypt.compare(password, user.password);

    // Si les hash ne correspondent pas ...
    if (!isMatch) {
      return res.render("login", {
        errorMessage: "Mauvaise combinaison login/mot de passe",
      });
    }

    // Si on arrive ici, c'est que tout est ok..
    // Le but maintenant, c'est d'enregistrer dans une session le fait que l'utilisateur soit connecté
    req.session.userId = user.id;
    res.redirect("/");
  },

  logout(req, res) {
    req.session.userID = null;
    res.redirect("/");
  },
};

module.exports = authController;