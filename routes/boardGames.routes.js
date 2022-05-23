const router = require("express").Router()

const BoardGame = require("./../models/BoardGame.model")
const Booking = require("../models/Booking.model")

const { isAuthenticated } = require("./../middlewares/jwt.middleware")

// BOARDGAME LIST
router.get('/', (req, res) => {

    BoardGame
        .find()
        .select('-owner')
        // .select('owner name description playingTime age gameImg players likes dislike')
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))
})

// CREATE BOARDGAME
router.post('/create', isAuthenticated, (req, res) => {
    const { name, description, kind, gameImg, min, max, age, playingTime } = req.body

    const { _id: owner } = req.payload

    const players = { min, max }

    BoardGame
        .create({ name, description, kind, gameImg, players, owner, age, playingTime })
        .then((boardgame) => res.status(201).json({ boardgame }))
        .catch(err => res.status(500).json(err))

})

router.get('/originals', (req, res) => {

    const originalGames = []

    BoardGame
        .find({ 'kind': { $eq: "ORIGINAL" } })
        .sort({ name: 1 })
        .then(response => {
            originalGames.push(response)

            responseCopy = [...response]

            responseCopy.sort((a, b) => {
                return b.likes - a.likes
            })
            originalGames.push(responseCopy)
        })
        .then(() => res.json(originalGames))

        .catch(err => res.status(500).json(err))

})

//BOARDGAME RELATED

router.get("/:id/rent", (req, res) => {

    const { id } = req.params

    BoardGame
        .findById(id)
        .then(boardgame => {

            return BoardGame.find({ 'kind': { $eq: "RENT" }, "name": { $eq: boardgame.name } })
        })
        .then(response => {

            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

// EDIT BOARDGAME
router.put('/:id/edit', (req, res) => {

    const { id } = req.params
    const { name, description, gameImg, min, max } = req.body

    BoardGame
        .findByIdAndUpdate(id, { name, description, gameImg, min, max },)
        .then(() => res.status(200).json("Updated"))
        .catch(err => res.status(500).json(err))
})

// LIKE BOARDGAME 
router.put('/:id/like', (req, res, next) => {

    const { id } = req.params

    BoardGame
        .findByIdAndUpdate(id, { $inc: { likes: 1 } })
        .then(() => res.status(200).json("Incremenet like"))
        .catch(err => res.status(500).json(err))
})

// DISLIKE BOARDGAME 
router.put('/:id/dislike', (req, res) => {

    const { id } = req.params

    BoardGame
        .findByIdAndUpdate(id, { $inc: { dislike: 1 } })
        .then(() => res.status(200).json("Increment Dislike"))
        .catch(err => res.status(500).json(err))
})

//FAV BOARDGAME 
router.post('/:id/favourite', (req, res) => {

    const { id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $addToSet: { favouriteGames: id } })
        .then(() => res.status(200).json("Add to favourite"))
        .catch(err => res.status(500).json(err))
})

//FAV BOARDGAME
router.post('/:id/delete-favourite', (req, res) => {

    const { id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $pull: { favouriteGames: id } })
        .then(() => res.status(200).json("Delete favourite"))
        .catch(err => res.status(500).json(err))
})

// DELETE BOARDGAME 
router.delete('/:id/delete', (req, res) => {

    const { id } = req.params

    BoardGame
        .findByIdAndDelete(id)
        .then(() => res.status(200).json("Deleted"))
        .catch(err => res.status(500).json(err))
})

// SEARCH BOARDGAME: NAME
router.get('/search-boardgame-by-name/:input', (req, res) => {

    const { input } = req.params

    BoardGame
        .find({ name: { $regex: input, $options: 'i' }, kind: { $eq: 'ORIGINAL' } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/owngames", isAuthenticated, (req, res) => {

    const { _id } = req.payload


    BoardGame
        .find({ 'owner': { $eq: _id } })
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.get("/rentedGames", isAuthenticated, (req, res) => {

    const { _id } = req.payload

    Booking
        .find({ 'renter': { $eq: _id } })
        .populate({
            path: 'boardGame',
            populate: { path: 'owner' }
        })
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.get("/:id", (req, res) => {

    // ARRAY VACIO [BG.O, , [BG.R ALL]]

    const { id } = req.params

    const boardGameData = []

    BoardGame
        .findById(id)
        .populate('owner')
        .then(details => {
            boardGameData.push(details)

            BoardGame
                .find({ 'kind': { $eq: "RENT" }, "name": { $eq: details.name } })
                .populate("owner")
                .then(rentGames => {
                    boardGameData.push(rentGames)
                })
                .then(() => res.json(boardGameData))

        })
        .catch(err => res.status(500).json(err))
})

module.exports = router