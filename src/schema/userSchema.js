const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        requierd: [true, "First name is required"],
        minlength: [5, "First name must be at least 5 character long"],
        lowercase: true,
        trim: true, // if the user gives extra spaces it will automatically remive it
        maxlength: [20, "First name should be less than 20 characters"]
    },
    lastName: {
        type: String,
        requierd: [true, "First name is required"],
        minlength: [5, "First name must be at least 5 character long"],
        lowercase: true,
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
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema) //Collection
module.exports = User;