const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content:{
    type: String,
  }, 
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  date: {
    type: Date,
    default: Date.now,
  },
  

})

module.exports = mongoose.model('Comment', CommentSchema)