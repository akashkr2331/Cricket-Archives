const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
    password: {
        type: String,
        required: true,
        min: 5,
      },
      likes:[
          {
            type: Schema.Types.ObjectId,
        ref: 'Match'
          }
        ]
})

module.exports = mongoose.model('User', userSchema);
