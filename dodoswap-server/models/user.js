let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')

// TODO: Create user schema
let userSchema = new mongoose.Schema({
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
    pic: String,
    admin: {
        type: Boolean,
        default: false
    }
})
//hash the passwords
userSchema.pre('save', function(done) {
    //only hash it if it's a new password, not if it's modified this refers to the userObject(schema)
    if(this.isNew) {
        this.password = bcrypt.hashSync(this.password, 12)
    }
    //indicate that we're okay to move on (to insert into DB)
    done()

})

//Make a JSON representation of the user (for sending on the JWT payload)
userSchema.set('toJSON', {
    transform: (doc, user) => {
        delete user.password
        delete user.__v 
        return user
    }
})

//Make a function that compares passwords
userSchema.methods.validPassword = function(typedPassword) {
    //typedPassword: plain text, just typed in by user
    //this.password: existing, hashed password
    return bcrypt.compareSync(typedPassword, this.password)
}

// TODO: Export user model
module.exports = mongoose.model('User', userSchema)