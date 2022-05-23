const { Schema, model } = require('mongoose')

const matchSchema = new Schema(
    {
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        description: {
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        boardGame: {
            type: Schema.Types.ObjectId,
            ref: 'BoardGame',
            required: true
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number],
        },
        kind: {
            type: String,
            enum: ["MATCH", "EVENT"],
        },
        players: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        timestamps: true
    }
);

module.exports = model('Match', matchSchema)