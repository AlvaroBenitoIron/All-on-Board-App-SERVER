const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
        },
        boardGame: {
            type: Schema.Types.ObjectId,
            ref: 'BoardGame',
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = model("Comment", commentSchema)