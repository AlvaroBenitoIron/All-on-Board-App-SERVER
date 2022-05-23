const router = require("express").Router()
const Comment = require("../models/Comment.model")

const { isAuthenticated } = require('../middlewares/jwt.middleware')


router.get('/:id', isAuthenticated, (req, res) => {

    const { id } = req.params

    Comment
        .find({ boardGame: { $eq: id } })
        .populate("owner")
        .then(response => res.status(201).json(response))
        .catch(err => res.status(500).json(err))
})

// CREATE COMMENT
router.post('/:id/create', isAuthenticated, (req, res) => {

    const { id } = req.params
    const { content } = req.body
    const { _id } = req.payload

    Comment
        .create({ owner: _id, boardGame: id, content, date: new Date() })
        .then(response => res.status(201).json(response))
        .catch(err => res.status(500).json(err))
})

// DELETE COMMENT
router.delete('/:id/delete', (req, res) => {

    const { id } = req.params

    Comment
        .findByIdAndDelete(id)
        .then((response) => res.status(201).json(response))
        .catch(err => res.status(500).json(err))
});

module.exports = router