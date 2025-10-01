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
  }],
  author: {
    type: Schema.Types.ObjectId, 
    ref : 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['technologie', 'lifestyle', 'business', 'sante', 'education', 'divertissement'],
    default: 'technologie'
  },
  image: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Article', ArticleSchema);