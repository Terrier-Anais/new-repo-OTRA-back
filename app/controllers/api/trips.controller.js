import CoreController from './core.controller.js';
import { tripsDatamapper } from '../../datamappers/index.datamapper.js';
import ApiError from '../../errors/api.error.js';

export default class TripsController extends CoreController {
  static entityName = 'Trip';

  static mainDatamapper = tripsDatamapper;

  static async findAll(req, res, next) {
    try {
      const rows = await tripsDatamapper.findAll();
      if (!rows) {
        throw new ApiError(404, 'Trips not found');
      }
      return res.json({ data: rows });
    } catch (error) {
      return next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const row = await tripsDatamapper.findById(id);
      if (!row) {
        throw new ApiError(404, 'Trip not found');
      }
      return res.json({ data: row });
    } catch (error) {
      return next(error);
    }
  }
}
