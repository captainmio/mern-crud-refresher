
const mongoose = require('mongoose');
const workoutModel = require('../models/WorkoutModel')


// get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await workoutModel.find({}).sort({createdAt: -1});
  return res.status(200).json(workouts);
}

// get workout by ID
const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: true, message: 'Invalid workout ID'});
  }

  const workout = await workoutModel.findById(id);

  if(!workout) {
    return res.status(404).json({error: true, message: 'Workout does not exist'});
  }

  return res.status(200).json(workout);

}

// create a workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;
  
    try {
      const workout = await workoutModel.create({title, load, reps});
      return res.status(200).json({message: workout})
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: true, message: 'Invalid workout ID'});
  }

  const workout = await workoutModel.findOneAndDelete({_id: id});

  if(!workout) {
    return res.status(404).json({error: true, message: 'Workout does not exist'});
  }

  return res.status(200).json(workout);
}


// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const {title, load, reps} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: true, message: 'Invalid workout ID'});
  }

  const workout = await workoutModel.findOneAndUpdate({_id: id}, {
    title,
    load,
    reps
  }, { new: true, runValidators: true })

  if(!workout) {
    return res.status(404).json({error: true, message: 'Workout does not exist'});
  }

  return res.status(200).json(workout);
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout
}