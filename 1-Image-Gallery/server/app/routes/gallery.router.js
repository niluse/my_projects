"use strict";
/* -------------------------------------------------------
    EXPRESSJS - gallery Project with Sequelize
------------------------------------------------------- */
// ROUTERS:

const gallery = require('../controllers/gallery.controller')

const router = require('express').Router()

// // List:
// router.get('/', gallery.list)
// // Create:
// router.post('/', gallery.create)
// // Read:
// router.get('/:id', gallery.read)
// // Update:
// router.put('/:id', gallery.update)
// // Delete:
// router.delete('/:id', gallery.delete)

router.route('/')
    .get(gallery.list)
    .post(gallery.create)

router.route('/:id')
    .get(gallery.read)
    .put(gallery.update)
    .patch(gallery.update)
    .delete(gallery.delete)

module.exports = router