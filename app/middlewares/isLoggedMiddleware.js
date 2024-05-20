export const isLoggedMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    next();
  };
  
