const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,

  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir une adresse email valide'],
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  articles: [{
    type: Schema.Types.ObjectId, 
    ref: 'Articles'
  }],
  followers: [{ //la reference est mis pour faire reference a d'autres utilisateurs
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]

}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema );