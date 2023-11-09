const multer = require('multer');
const fs = require('fs');
const path = require('path');

const createStorage = (entityOrFolderName = "BusinessesPdf") => {
    const folder = path.join(__dirname, `../../public/pdfs/${entityOrFolderName}`)

    /* Si la carpeta no existe la crea */
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
    }

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, `./public/pdfs/${entityOrFolderName}`);
        },
        filename: (req, file, callback) => {
            callback(null, `${entityOrFolderName}-${Date.now()}-${file.originalname}`);
        },
    });

    const uploads = {}
    uploads[entityOrFolderName] = multer({
        storage,
        fileFilter: (req, file, cb) => {
            const allowedExtensions = ['.pdf'];
            const fileExtension = path.extname(file.originalname).toLowerCase();
        
            if (allowedExtensions.includes(fileExtension)) {
              // Aceptar el archivo
              cb(null, true);
            } else {
              // Rechazar el archivo
              cb(new Error('El archivo no es un PDF válido.'));
            }
          },
        limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño: 10 MB
    })

    return uploads[entityOrFolderName]

};

module.exports = {
    uploadPdfBusiness: createStorage('BusinessesPdf'),
};