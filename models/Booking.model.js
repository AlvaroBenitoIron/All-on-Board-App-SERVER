const { Schema, model } = require("mongoose")

const bookingSchema = new Schema(
    {
        boardGame: {
            type: Schema.Types.ObjectId,
            ref: 'BoardGame',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        renter: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = model("Booking", bookingSchema)