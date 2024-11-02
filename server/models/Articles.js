const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [{  //les [] c'est pour pouvoir stocke plusieurs tags par articles
    type: String,
    required: true,
  }],
  author: {
    type: Schema.Types.ObjectId, 
    ref : 'User',
    required: true,
  }, 
  createDate: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Article', ArticleSchema);