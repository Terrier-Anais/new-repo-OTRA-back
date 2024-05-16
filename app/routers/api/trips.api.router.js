import express from 'express';
import Controller from '../../controllers/api/trips.controller.js';
import wrapper from '../../middlewares/controller.wrapper.js';
// import createSchema from '../../schemas/trips.create.schema.js';
// import updateSchema from '../../schemas/trips.update.schema.js';
// import validationMiddleware from '../../middlewares/validation.middleware.js';

const router = express.Router();

router.route('/')
  /**
   * GET /api/trips
   * @summary Get all trips
   * @tags Trips
   * @return {Trip[]} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .get(wrapper(Controller.getAll.bind(Controller)))
  /**
   * POST /api/trips
   * @summary Create a new trip
   * @tags Trips
   * @param {TripInput} request.body.required - Trip info
   * @return {Trip} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  // .post(
  //   validationMiddleware(createSchema, 'body'),
  //   wrapper(Controller.create.bind(Controller)),
  // );

router.route('/:id(\\d+)')
  /**
   * GET /api/posts/{id}
   * @summary Get a post from its id
   * @tags Posts
   * @param {number} id.path.required - Post id
   * @return {Post} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .get(wrapper(Controller.getOne.bind(Controller)))
  /**
   * PATCH /api/posts/{id}
   * @summary Update a post
   * @tags Posts
   * @param {number} id.path.required - Post id
   * @param {PostInput} request.body.required - Post info
   * @return {Post} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  // .patch(
  //   validationMiddleware(updateSchema, 'body'),
  //   wrapper(Controller.update.bind(Controller)),
  // )
  /**
   * DELETE /api/posts/{id}
   * @summary Delete a post
   * @tags Posts
   * @param {number} id.path.required - Post id
   * @return {Post} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .delete(wrapper(Controller.delete.bind(Controller)));


/*
router.route('/').get(controllerGet).post(controllerPost);

===

router.get('/', controllerGet);
router.post('/', controllerPost);
*/
export default router;