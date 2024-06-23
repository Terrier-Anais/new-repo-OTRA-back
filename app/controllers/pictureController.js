import fs from 'fs/promises';
import path from 'path';

const pictureController = {
  /**
   * Upload picture handler
   * @param {object} req - The request object
   * @param {object} res - The response object
   */
    async uploadPicture(req, res) {
      // Extract base64 part of the image
      const { title, photo } = req.body;
      // Create the image path based on the title, replacing spaces with underscores and converting to lowercase
      const base64Image = photo.split(';base64,').pop();
      let imagePath = path.join('public/photos', `${title.replace(/\s+/g, '_').toLowerCase()}.jpg`);
      try {
        // Write the base64 image data to the file
        await fs.writeFile(imagePath, base64Image, { encoding: 'base64' });
        // Create a path for database storage
        const sqlPath = `/photos/${title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
        console.log('Image sauvegardée avec succès à', sqlPath);
        res.status(200).json({ success: true, sqlPath });
      } catch (err) {
        console.error('Erreur lors de l\'écriture du fichier :', err);
        return res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'image.' });
      }
    },
};

export default pictureController;