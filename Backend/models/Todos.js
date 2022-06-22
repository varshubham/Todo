const mongoose = require('mongoose')
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    todo:{
        type: String,
        required : true
    },
    edate:{
        type: Date,
        required: true
    },
    tag:{
        type : String,
        default : "Personal"
    },
    completed:{
        type:Boolean,
        default: false,
        required : true
    },
    date:{
        type:Date,
        default:Date.now
    },
    cdate:{
        type:Date,
        default : null
    }
});

module.exports = mongoose.model('todo',NotesSchema)