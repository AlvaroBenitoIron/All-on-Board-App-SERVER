const { Schema, model } = require("mongoose")

const boardGameSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        playingTime: {
            type: String,
        },
        age: {
            type: String,
        },
        gameImg: {
            type: String,
            required: true,
            default: "https://fotografias.lasexta.com/clipping/cmsimages02/2016/09/20/10E8D640-139A-4D77-83F8-CE0A81CD3B2D/98.jpg?crop=1393,784,x0,y14&width=1900&height=1069&optimize=high&format=webply"
        },
        kind: {
            type: String,
            required: true,
            enum: ["ORIGINAL", "RENT"],
            default: "RENT"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        players: {
            min: {
                type: Number,
            },
            max: {
                type: Number
            },
        },
        likes: {
            type: Number,
            default: 0
        },
        dislike: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
)

module.exports = model("BoardGame", boardGameSchema)