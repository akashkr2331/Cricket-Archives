const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment=require('./comments')

const MatchSchema = new Schema({
    status: String,
    potm:String,
    date:String,
    srl:String,
    tournament: String,
    name1:String,
    name2: String,
    over1: String,
    over2: String,
    run1:Number,
    run2:Number,
    wkt1:Number,
    wkt2:Number,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Match', MatchSchema);

MatchSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

