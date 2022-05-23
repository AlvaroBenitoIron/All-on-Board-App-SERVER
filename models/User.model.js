const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Indica el correo electrónico"],
    },
    description: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Indica el nombre de usuario"],
    },
    password: {
      type: String,
      required: [true, "Indica la contraseña"],
    },
    favouriteGames: [{
      type: Schema.Types.ObjectId,
      ref: 'BoardGame'
    }],
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    avatar: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png"
    },
    phone: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema)