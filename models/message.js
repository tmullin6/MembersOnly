const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        timestamp: {type: Date, default: DateTime.now()},
        text: {type: String, required: true}
    }
)

module.exports=mongoose.model('Message',MessageSchema);