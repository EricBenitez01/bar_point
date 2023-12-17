const db = require('../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let businessId  = req.params.id;
            let order = "id";
            let orders = ["id", "benefitname", "point_req"];
    
            if (!orders.includes(order)) {
                throw new Error(`El campo ${order} no existe. Campos permitidos: [benefitname, point_req]`);
            }
            let whereClause = {};

            if (businessId) {
                whereClause.businessfk  = businessId;
            }
    
            let benefits = await db.Benefit.findAll({
                /*
                Se utiliza para traer datos del negocio  
                include: [
                    {
                        association: 'business'
                    }
                ], */
                where: whereClause,
                order: [order],
            });
    
            if (benefits.length) {
                return res.status(200).json({
                    ok: true,
                    meta: {
                        total: benefits.length
                    },
                    data: benefits
                });
            }
    
            throw new Error("No hay beneficios");
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : "Contacte al administrador del sitio"
            });
        }
    },
    detail: async (req, res) => {
        try {

            const { id } = req.params

            if (isNaN(id)) {
                throw new Error('the ID must be a number')
            }

            let benefit = await db.Benefit.findByPk(id, {
                attributes: {
                    exclude: ['img'],
                },
                include: [
                    {
                        association: 'business',
                        attributes: ['username']
                    }
                ]
            });

            if (benefit) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    data: benefit,
                });
            }
            throw new Error('There is no benefit')

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    },
    create: async (req, res) => {

        const { businessfk , benefitname, img, discount, points_req, description } = req.body;

        try {
            let newBenefit = await db.Benefit.create(
                {
                    businessfk : +businessfk ,
                    benefitname: benefitname?.trim(),
                    discount: +discount,
                    points_req: +points_req,
                    img: req.file?.filename,
                    description: description,
                }
            )

            if (newBenefit) {
                return res.status(201).json({
                    ok: true,
                    status: 201,
                    data: newBenefit,
                    url: `${req.protocol}://${req.get('host')}/benefits/${newBenefit.id}`
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

        const { benefitname, discount, img, points_req, description } = req.body;

        try {
            let updateBenefit = await db.Benefit.findByPk(req.params.id);

            updateBenefit.benefitname = benefitname?.trim();
            updateBenefit.discount = +discount;
            updateBenefit.points_req = +points_req;
            updateBenefit.img = req.file?.filename || updateBenefit.img;
            updateBenefit.description = +description;

            await updateBenefit.save();

            if (updateBenefit) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    data: updateBenefit,
                    url: `${req.protocol}://${req.get('host')}/benefits/${updateBenefit.id}`
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
            let benefitId = req.params.id;
            const benefit = await db.Benefit.findByPk(benefitId);

            await db.Benefit.destroy({
                where: { id: benefitId },
                force: true // force: true is to ensure that the action is executed
            });

            if (benefit) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    msg: 'Benefit removed'
                })
            };

        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message ? error.message : "Contact the site administrator",
            });
        }
    }
}