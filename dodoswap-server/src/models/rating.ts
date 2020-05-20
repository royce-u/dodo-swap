import * as mongoose from 'mongoose'

//Create Rating interface extending mongoose.Document (which includes ._id)
export interface RatingInterface extends mongoose.Document {
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
export default mongoose.model<RatingInterface>('Rating', ratingSchema)
