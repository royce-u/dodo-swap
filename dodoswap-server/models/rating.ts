import * as mongoose from 'mongoose'
import User from '../models/user'
import Event from '../models/event'

//Create Rating interfeace extending mongoose.Document (which includes ._id)
export default interface Rating extends mongoose.Document {
    ratedUserId: string;
    eventDate: Date;
    score: number;
    ratedById: string;

}
//create rating schema
let ratingSchema: mongoose.Schema = new mongoose.Schema({
    ratedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    eventDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    score: Number,
    ratedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

//create model with type rating and export rating model
let Rating: mongoose.Model<Rating> = mongoose.model<Rating>('Rating', ratingSchema)
module.exports = Rating