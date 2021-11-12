const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {DateTime} = require('luxon');

const MessageSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        timestamp: {type: Date, default: Date.now()},
        text: {type: String, required: true}
    }
)

MessageSchema.virtual('formatted_timestamp').get(function(){
    let formatted_timestamp = DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_FULL);
    return formatted_timestamp;
})

module.exports=mongoose.model('Message',MessageSchema);