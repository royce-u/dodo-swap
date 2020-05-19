import * as mongoose from 'mongoose'
import Item from '../models/item'


// Create Event interface extending mongoose.Document (which includes ._id)
export default interface Event extends mongoose.Document {
    hostId: string;
    private: boolean;
    attendees: {
        attendeeId: string,
        top5: Item[],
        toBring: Item[]
    };
    date: Date;
    time: string; 
    maxVisitor: number;
    dodoCode: string;
    comments: {
        author: string,
        date: Date,
        comment: string
    };
}
//Create Embedded Attendee Schema
let attendeeSchema: mongoose.Schema = new mongoose.Schema({
    attendeeId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    top5: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    toBring: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
})
//Create Embedded Comment Schema
let commentSchema: mongoose.Schema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})
//Create Event Schema
let eventSchema: mongoose.Schema = new mongoose.Schema({
    hostId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    private: {
        type: Boolean,
        default: false
    },
    attendees: attendeeSchema, 
    date: Date,
    time: String,
    maxVisitor: {
        type: Number,
        default: 3,
        min: 1, 
        max: 7
    },
    dodoCode: String,
    comments: commentSchema
})


// Create model with type event and export event model
let Event: mongoose.Model<Event> = mongoose.model<Event>('Event', eventSchema)
module.exports = Event