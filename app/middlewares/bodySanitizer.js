import sanitizeHtml from "sanitize-html";

export const bodySanitizer = (req, res, next) => {
   // Iterate over each key in the req.body object
  Object.keys(req.body).forEach(key => { 
    // Check if the value of the current key is a string
    if (typeof req.body[key] === "string") {
       // Sanitize the string value to prevent XSS attacks
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  });
  next();
};