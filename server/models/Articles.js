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
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  createDate: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Article', ArticleSchema);