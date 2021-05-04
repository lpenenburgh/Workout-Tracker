const router = require("express").Router();
//does this need .js at the end?
const Workout = require("../models/workout.js");


//New workout
router.post("/api/workouts", (req, res) => {
    Workout.create({}).then((body) => {
        console.log(body)
        res.json(body);
    })
        .catch((err) => {
            res.json(err);
        });
});

//get all workouts and their duration
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ])
        .then((dbWorkout) => {
          res.json(dbWorkout);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
    

//get workouts in range(using aggregate)
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .sort({ day: -1 }).limit(7)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});


//New exercise
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {
            $push: { exercises: body },
        },
        {
            new: true,
            runValidators: true,
        }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;