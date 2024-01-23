const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Match=require('./match')

const commentSchema = new Schema({
    description: String,
    // userId: String,
    match: {
        type: Schema.Types.ObjectId,
        ref: 'Match'
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentSchema);