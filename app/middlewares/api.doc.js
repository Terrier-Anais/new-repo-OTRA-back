import expressJSDocSwagger from 'express-jsdoc-swagger';

const options = {
  info: {
    version: '1.0.0',
    title: "O'blog",
    description: "Blog de l'école O'clock",
  },
  baseDir: import.meta.url.substring(7, import.meta.url.lastIndexOf('/')),
  // On analyse tous les fichiers du projet
  filesPattern: '../**/*.js',
  // URL où sera disponible la page de documentation
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',
  // Activation de la documentation à travers une route de l'API
  exposeApiDocs: true,
  apiDocsPath: '/api',
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
export default (app) => expressJSDocSwagger(app)(options);
