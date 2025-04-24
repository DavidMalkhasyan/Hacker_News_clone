const { url } = require('inspector');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  url: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});


module.exports = mongoose.model('Post', postSchema);