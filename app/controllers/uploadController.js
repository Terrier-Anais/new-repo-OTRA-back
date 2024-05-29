import { VisitPhoto } from '../models/index.js';

const uploadController = {
    async uploadPicture(req, res){
        try {
            const { buffer } = req.file;
            const base64Image = buffer.toString('base64');
            const visitPhoto = await VisitPhoto.create({ photo: base64Image });
            
            res.status(200).json({ success: true, visitPhoto });
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Database error' });
          }
    }};

export default uploadController;