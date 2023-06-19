const express = require('express')
const {UserModel} = require('../Models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRout = express.Router()



userRout.post('/register', async(req, res)=>{
    const {name, age, city, email,category, weigth, pass} = req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash)=>{
            const user = new UserModel({email,name, age,category, weigth, city, pass:hash})
            user.save()
                res.status(200).json({msg:"Register success!!"})
        })
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

userRout.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        bcrypt.compare(pass, user.pass, (err, result) => {
          if (result) {
            const userName = user.name
            const token = jwt.sign({ authorID: user._id, author: user.name }, 'CW');
            res.status(200).json({ msg: 'Login successful!', token,userName });
          } else {
            res.status(401).json({ error: 'Wrong password' });
          }
        });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


userRout.patch('/update/:id', async(req, res)=>{
    const {id} = req.params
    try{
        const user = await UserModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).json({msg:'User Updated!'})

    }catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports = {userRout}