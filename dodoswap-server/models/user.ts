import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'
import Rating from '../models/rating'
import Item from '../models/item'
import Event from '../models/event'


// Create User interface extending mongoose.Document (which includes ._id)
export default interface User extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    userName: string;
    islandName: string;
    nativeFruit: string;
    pic: string; 
    ratings: Rating[];
    inventory: Item[];
    wishList: Item[];
    friends: User[];
    events: Event[];
    validPassword(user: User, password: string): boolean;
}

//Create user schema
let userSchema: mongoose.Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8
    }, 
    userName: String,
    islandName: String,
    nativeFruit: String,
    pic: String,
    ratings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rating'}],
    inventory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    wishList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]


})
//hash the passwords
userSchema.pre('save', function(this: User, done) {
    //only hash it if it's a new password, not if it's modified this refers to the userObject(schema)
    if(this.isNew) {
        this.password = bcrypt.hashSync(this.password, 12)
    }
    //indicate that we're okay to move on (to insert into DB)
    done()

})

//Make a JSON representation of the user (for sending on the JWT payload)
userSchema.set('toJSON', {
    transform: (doc, user: User) => {
        delete user.password
        delete user.__v 
        return user
    }
})

//Make a function that compares passwords
userSchema.methods.validPassword = function(user: User, typedPassword: string): boolean {
    //typedPassword: plain text, just typed in by user
    //this.password: existing, hashed password
    return bcrypt.compareSync(typedPassword, user.password)
}

// Create model with type user and export user model
let User: mongoose.Model<User> = mongoose.model<User>('User', userSchema)
module.exports = User