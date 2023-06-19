const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
    mealName:{type:String,required:true},
    category:{type:String,required:true},
    type:{type:String,required:true},
    protein:{type:Number,required:true},
    img:{type:String,required:true},
},{
    versionKey:false
})

const MealModel = mongoose.model('meal', mealSchema)

module.exports = {MealModel}