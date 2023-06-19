const express = require('express')
const {connection} = require('./db')
const {userRout} = require('./Routers/User.router')
const {mealRouter} = require('./Routers/Meal.route')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/user',userRout)
app.use('/meal',mealRouter)


const port = 8080

app.listen(port,async()=>{
    try{
        console.log('connected to Data Base')
    }catch(err){
        console.log('can not connect to DB')
    }
    console.log(`server is running at port no. ${port}`)
})
