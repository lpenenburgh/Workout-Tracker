const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    day : {
        type: Date,
        default: Date.now
    },
    //exercise
        //type
        //name
        //duration
        //weight
        //reps
        //sets
        //distance
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;