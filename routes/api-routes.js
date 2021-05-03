const router = require("express").Router();
//does this need .js at the end?
const Workout = require("../models/Workout");

//get all workouts and their duration
router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        });
});

//get workouts in range(using aggregate)


//New workout


//New exercise


module.exports = router;