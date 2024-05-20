import { User } from "../models/index.js";

 export const sessionMiddleware = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const userData = await User.findByPk(userId, {
      attributes: { exclude: "password" },
    });
    console.log(userData);
    req.session.user = userData;
    res.locals.user = userData;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).render("500");
  }
};

