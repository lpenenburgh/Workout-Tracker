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
router.get("/api/workouts/range", ({ body }, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
    .sort({day: -1}).limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//New workout


//New exercise


module.exports = router;