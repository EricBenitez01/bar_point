const db = require('../database/models');
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs').promises;

module.exports = {
    list: async (req, res) => {

        try {
            let { order = "id" } = req.query;
            let orders = ["id", "username", "email"];

            if (!orders.includes(order)) {
                throw new Error(`The ${order} field does not exist. Allowed fields : [username, email]`);
            }
            let businesses = await db.Business.findAll({
                order: [order],
                attributes: {
                    exclude: ['password', 'create_time', 'rolFK']
                }
            })
            if (businesses.length) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        total: businesses.length
                    },
                    data: businesses
                })
            }
            throw new Error("There are no businesses");

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator"
            })
        }
    },
    detail: async (req, res) => {
        try {

            const { id } = req.params

            if (isNaN(id)) {
                throw new Error('the ID must be a number')
            }

            let business = await db.Business.findByPk(id, {
                attributes: {
                    exclude: ['password', 'create_time', 'rolFK'],
                }
            });

            if (business) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    data: business,
                });
            }
            throw new Error('There is no business')

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    create: async (req, res) => {

        const { name, email, password, lastname, cuit, adress, phone, businessName, rolFK, menu } = req.body

        try {

            // Se verifica si el business ya existe en la bd
            const existingBusiness = await db.Business.findOne({ where: { email: email } });

            if (existingBusiness) {
                return res.status(400).json({
                    ok: false,
                    msg: 'The entered business already exists in the database'
                });
            }

            // Se genera el hash para el password
            const hashedPassword = await bcrypt.hash(password, 10);

            let newBusiness = await db.Business.create(
                {
                    name: name && name.trim(),
                    lastname: lastname && lastname.trim(),
                    cuit: cuit,
                    adress: adress,
                    phone: phone,
                    businessName: businessName,
                    email: email,
                    password: hashedPassword,
                    rolFK: 2,
                    menu: req.file?.filename,
                }
            )

            if (newBusiness) {

                return res.status(200).json({
                    ok: true,
                    meta: {
                        total: 1,
                        url: `${req.protocol}://${req.get('host')}/businesses/${newBusiness.id}`
                    },
                    data: newBusiness,
                })
            };

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    update: async (req, res) => {

        const { username, email, password, menu } = req.body;

        // Se genera el hash para el password
        if (password) {
            var hashedPassword = await bcrypt.hash(password, 10);
        }

        try {
            let updateBusiness = await db.Business.findByPk(req.params.id);

            // Almacena la ruta del archivo anterior antes de la actualización
            const previousMenuPath = updateBusiness.menu;

            updateBusiness.username = username?.trim();
            updateBusiness.email = email?.trim();
            updateBusiness.password = hashedPassword || updateBusiness.password;
            updateBusiness.menu = req.file?.filename || updateBusiness.menu;

            await updateBusiness.save();

            // Elimina el archivo anterior solo si el campo 'menu' se actualiza
            if (req.file && previousMenuPath) {
                await fs.unlink(
                    path.join(__dirname, `../../public/pdfs/BusinessesPdf/${previousMenuPath}`)
                );
            }

            if (updateBusiness) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    data: updateBusiness,
                    url: `${req.protocol}://${req.get('host')}/businesses/${updateBusiness.id}`
                })
            };

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    destroy: async (req, res) => {

        try {
            let businessId = req.params.id;
            const business = await db.Business.findByPk(businessId);

            await db.Business.destroy({
                where: { id: businessId },
                force: true // force: true is to ensure that the action is executed
            });

            if (business) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    msg: 'Business removed'
                })
            };

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    menu: (req, res) => {
        res.sendFile(
            path.join(__dirname, `../../public/pdfs/BusinessesPdf/${req.params.pdf}.pdf`)
        )
    }
}