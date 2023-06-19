const mongoose = require('mongoose')
const userShema = mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true},
    pass:{type:String, required:true},
    city:{type:String, required:true},
    weigth:{type:Number, required:true},
    category:{type:String, required:true}

},{
    versionKey:false
})

const UserModel = mongoose.model('user', userShema)

module.exports = {UserModel}