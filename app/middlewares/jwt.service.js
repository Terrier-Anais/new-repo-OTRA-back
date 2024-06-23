import jwt from 'jsonwebtoken';

export const jwtService = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      // Check if the Authorization header is present
      const token = authHeader.split(' ')[1];
     // Verify the token using the secret key
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
      // If the token is valid, attach the decoded user object to the request
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
