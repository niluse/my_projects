"use strict";
/* -------------------------------------------------------
    EXPRESSJS - Gallery Project with Sequelize
------------------------------------------------------- */
// CONTROLLERS:

const Gallery = require('../models/gallery.model')

module.exports = {

    list: async (req, res) => {

        // const data = await Gallery.findAll()
        const data = await Gallery.findAndCountAll()

        res.status(200).send({
            error: false,
            result: data
        })
    },

    // CRUD:

    create: async (req, res) => {

        // const receivedData = req.body

        // const data = await Gallery.create({
        //     title: receivedData.title,
        //     description: receivedData.description,
        //     priority: receivedData.priority,
        //     isDone: receivedData.isDone,
        //     // newKey: 'newValue' // Modelde tanımlanmadığı için bir işe yaramayacaktır.
        // })

        const data = await Gallery.create(req.body)

        res.status(201).send({
            error: false,
            result: data.dataValues
        })
    },

    read: async (req, res) => {

        // const data = await Gallery.findOne({ where: { id: req.params.id } })
        const data = await Gallery.findByPk(req.params.id)

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {

        // const data = await Gallery.update({ ...newData }, { ...where })
        const data = await Gallery.update(req.body, { where: { id: req.params.id } })

        res.status(202).send({
            error: false,
            message: 'Updated',
            body: req.body, // Gönderdiğim veriyi göster.
            result: data,
            new: await Gallery.findByPk(req.params.id) // Güncellenmiş veriyi de göster.
        })
    },

    delete: async (req, res) => {

        // const data = await Gallery.destroy({ ...where })
        const data = await Gallery.destroy({ where: { id: req.params.id } })
        // console.log(data)

        // //? 204 No Content -> Ekrana çıktı vermeyebilir.
        // res.status(204).send({
        //     error: false,
        //     message: 'Deleted',
        //     result: data
        // })

        if (data > 0) { // Silme gerçekleşti ise:
            // res.status(204).send()
            //? Sadece status çıktı ver:
            res.sendStatus(204)
        } else { // Silme gerçekleşmedi ise:
            // res.status(404).send({
            //     error: true,
            //     result: data
            // })
            //? ErrorHandler'a havale edebilirim:
            res.errorStatusCode = 404
            throw new Error('Not Found.')
        }
    }
}