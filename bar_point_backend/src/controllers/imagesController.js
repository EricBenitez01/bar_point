const path = require('path');

module.exports = {
    serveImage: async (req, res) => {
        const image = req.params.image;
        const pathImage = path.resolve(__dirname, `../../public/images/benefitsImage/${image}`);
        console.log("Imagen: " + pathImage);

        res.sendFile(pathImage);
    }
}