const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        last_name: {type: String, required: true, maxLength: 100},
        username: {type: String, required: true},
        password: {type: String, required: true},
        membership_status: {type: String, default:"Visitor", required: true},
    }
);

UserSchema.virtual('name').get(function(){
    return this.first_name+','+this.last_name;
});

UserSchema.virtual('url').get(function(){
    return "/users/"+this._id;
});

module.exports =mongoose.model('User',UserSchema);

