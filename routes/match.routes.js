const router = require("express").Router()
const Match = require("./../models/Match.model")

const { isAuthenticated } = require('../middlewares/jwt.middleware')

// MATCHES LIST
router.get('/', (req, res) => {

    Match
        .find({ kind:  "MATCH"  })
        .sort({ startTime: 1 })
        .populate('boardGame')
        // .select('organizer description startTime boardGame location kind players')
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))
})

// CREATE MATCH
router.post('/create', isAuthenticated, (req, res) => {
    const { description, startTime, boardGame, lat, lng, kind } = req.body
    const { _id } = req.payload

    const location = {
        type: "Point",
        coordinates: [lat, lng]
    }

    Match
        .create({ organizer: _id, description, startTime, boardGame, location, kind })
        .then((match) => res.status(201).json({ match }))
        .catch(err => res.status(500).json(err))
})

// EDIT MATCH
router.put("/:id/edit", (req, res) => {

    const { id } = req.params
    const { organizer, description, startTime, boardGame, location, kind } = req.body

    Match
        .findByIdAndUpdate(id, { organizer, description, startTime, boardGame, location, kind })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// DELETE MATCH
router.delete("/:id/delete", (req, res) => {

    const { id } = req.params

    Match
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// JOIN MATCH 
router.put('/:id/join', isAuthenticated, (req, res) => {

    const { id } = req.params
    const { _id } = req.payload

    Match
        .findById(id)
        .populate('boardGame')
        .then(match => {
            // if (match.players.length < match.boardGame.players.max) {

                Match
                    .findByIdAndUpdate(id, { $addToSet: { players: _id } })
                    .then(response => res.json(response))
                    .catch(err => res.status(500).json(err))
            // } else {
            //     res.status(500).json(err)
            // }
        })
})

// UNJOIN MATCH 
router.post('/:id/unjoin', isAuthenticated, (req, res) => {

    const { id } = req.params
    const { _id } = req.payload

    Match
        .findByIdAndUpdate(id, { $pull: { players: _id } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// MY MATCHES
router.get('/mymatches', isAuthenticated, (req, res) => {

    const { _id } = req.payload

    Match
        .find({ players: _id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/events', (req, res) => {

    Match
        .find({ kind: { $eq: "EVENT" } })
        .populate("boardGame")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// MATCH DETAILS
router.get("/:id", (req, res) => {

    const { id } = req.params

    Match
        .findById(id)
        .populate('boardGame organizer players')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router