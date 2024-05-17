// import express from 'express';
// import router from './routers/index.router.js';
// import createDoc from './middlewares/api.doc.js';
// import logger from './utils/logger.js';

// const app = express();

// app.set('view engine', 'pug');
// app.set('views', 'app/views');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, _, next) => {
//   logger.http(req.url, { ip: req.ip, userAgent: req.headers['user-agent'] });
//   next();
// });

// /**
//  * GET /api
//  * @summary Get documentation
//  * @tags Base
//  * @return {object} 200 - success response - application/json
//  * @return {ApiJsonError} 400 - Bad request response - application/json
//  */
// createDoc(app);

// app.use(router);

// export default app;
