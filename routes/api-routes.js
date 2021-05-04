const router = require("express").Router();
//does this need .js at the end?
const Workout = require("../models/Workout.js");

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
router.post("api/workouts", ({ body }, res) => {
    Workout.create(body).then((dbWorkout) => {
        console.log(body)
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//New exercise
router.put("/api/workouts/:id", ({ params, body }, res) => {
    Workout.findByIdAndUpdate(params.id, {
      $push: {
        exercises: body,
      },
    })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

module.exports = router;