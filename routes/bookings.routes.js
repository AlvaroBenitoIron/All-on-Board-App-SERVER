const router = require('express').Router()
const { Router } = require('express')
const { isAuthenticated } = require('../middlewares/jwt.middleware')
const Booking = require('../models/Booking.model')

// CREATE BOOKING 
router.post("/:id/create", isAuthenticated, (req, res) => {

    const { id } = req.params
    const { _id: renter } = req.payload
    const { startDate, endDate } = req.body

    Booking
        .create({ renter, boardGame: id, startDate, endDate })
        .then((booking) => res.status(201).json(booking))
        .catch(err => res.status(500).json(err))
})

// BOOKING DETAILS
router.get("/:id", (req, res) => {

    const { id } = req.params

    Booking
        .find({ 'boardGame': { $eq: id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// EDIT BOOKING
router.put("/:id/edit", (req, res) => {

    const { id } = req.params
    const { boardGame, startDate, endDate } = req.body

    Booking
        .findByIdAndUpdate(id, { boardGame, startDate, endDate })
        .then(() => res.json("Saved booking"))
        .catch(err => res.status(500).json(err))
})

// DELETE BOOKING
router.delete("/:id/delete", (req, res) => {

    const { id } = req.params

    Booking
        .findByIdAndDelete(id)
        .then((response) => res.status(201).json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router