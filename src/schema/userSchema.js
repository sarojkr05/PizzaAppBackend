const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        requierd: [true, "First name is required"],
        minlength: [5, "First name must be at least 5 character long"],
        trim: true, // if the user gives extra spaces it will automatically remive it
        maxlength: [20, "First name should be less than 20 characters"]
    }, 
    lastName: {
        type: String,
        minlength: [5, "First name must be at least 5 character long"],
        trim: true, // if the user gives extra spaces it will automatically remive it
        maxlength: [20, "First name should be less than 20 characters"]
    },
    mobileNumber: {
        type: String,
        trim: true,
        minlength: [10, "Phone number should be 10 digit long"],
        maxlength: [10, "Phone number should be 10 digit long"],
        unique: [true, "This number is already in use"],
        require: [true, "Phone number should be provided"]
    },
    email: {
        type: String,
        requierd: [true, "Email should be provided"],
        trim: true,
        unique: [true, "Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        requierd: [true, "Password should be provided"],
        trim: true,
        minlength: [6, "Password should be at least 6 character long"]
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    address: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function() {
    //Here you can modify your user  before it is saved in mongoDB
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
})

const User = mongoose.model("User", userSchema) //Collection
module.exports = User;