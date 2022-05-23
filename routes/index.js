module.exports = app => {

    // AUTH ROUTES
    const authRoutes = require('./auth.routes')
    app.use('/api/auth', authRoutes)

    // USER ROUTES
    const userRoutes = require('./user.routes')
    app.use('/api/user', userRoutes)

    // BOARDGAMES ROUTES
    const boardGamesRoutes = require("./boardGames.routes.js");
    app.use("/api/boardgames", boardGamesRoutes);

    // MATCH ROUTES
    const matchRoutes = require('./match.routes')
    app.use('/api/match', matchRoutes)

    // COMMENT ROUTES
    const commentRoutes = require('./comment.routes')
    app.use('/api/comment', commentRoutes)

    // BOOKINGS ROUTES
    const bookingsRoutes = require('./bookings.routes')
    app.use('/api/bookings', bookingsRoutes)


    const uploadRoutes = require('./upload.routes')
    app.use('/api/upload', uploadRoutes)

}