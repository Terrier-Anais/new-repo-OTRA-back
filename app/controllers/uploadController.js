import fs from 'fs'

const uploadController = {
    async uploadPicture(req, res){
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    const base64Data = `data:${mimeType};base64,${base64Image}`;
    const fileName = `public/${req.file.originalname}-${Date.now()}.txt`;

    fs.writeFile(fileName, base64Data, (err) => {
        if (err) {
            console.error('Erreur lors de la sauvegarde de l\'image:', err);
            res.status(500).send('Erreur du serveur');
        } else {
            res.status(200).send('Image uploadée et sauvegardée en base64 avec succès');
        }
    });
}};

export default uploadController;