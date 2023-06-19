const express = require('express');
const jwt = require('jsonwebtoken');
const {MealModel} = require('../Models/Meal.model');
const {auth} = require('../middelWare/auth')


const mealRouter = express.Router();

mealRouter.post('/add',auth, async (req, res) => {
    try {
      const newMeal = new MealModel(req.body);
      await newMeal.save();
      res.status(200).json(newMeal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  mealRouter.get('/', async (req, res) => {
    try {
      const { search, filter, sort } = req.query;
      const query = MealModel.find();
      if (search) {
        query.or([
          { name: { $regex: search, $options: 'i' } }, 
          { description: { $regex: search, $options: 'i' } }, 
        ]);
      }
  
      if (filter) {
        query.where('category').equals(filter); 
      }
  
      if (sort) {
        query.sort(sort); 
      }

  
      const meals = await query.exec();
  
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // mealRouter.get('/', async(req , res)=>{
  //   const meal = await MealModel.find()
  //    res.send(meal)
  // })
mealRouter.get('/:id', auth,async (req, res) => {
  try {
    const meal = await MealModel.findById(req.params.id);
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mealRouter.patch('/:id',auth, async (req, res) => {
  try {
    const mealData = req.body;
    const meal = await MealModel.findByIdAndUpdate(req.params.id, mealData, {
      new: true,
    });
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mealRouter.delete('/:id',auth, async (req, res) => {
  try {
    const meal = await MealModel.findByIdAndDelete(req.params.id);
    if (meal) {
      res.json({ message: 'Meal deleted' });
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {mealRouter};
