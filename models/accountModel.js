//this a model for user accounts
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//this declares a mongoose schema. these are
//the values that mongoDB will store in the database.
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index:{
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    obj_status: {
        type: String,
        required: true
    }
});

//next we hash the password. this is middleware that occurs 
//before a user is saved to the database.
UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

//here is a function that compares passwords
//verifies login info
UserSchema.methods.comparePassword = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('Account', UserSchema);