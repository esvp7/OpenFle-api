const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    profilePicture: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    frenchLevel: { type: String, required: true },
    speakingLanguages: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: false},
    instructorType: { type: String, required: false, default: "bronze tier" },
    joined: { type: String, required: false, default: Date("<YYYY-mm-dd>") },
    frenchResources: { type: String, required: true },
    email: {type: String, required: true },
    password: { type: String, required: true },

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, "foobarbaz", {
        expiresIn: "7d"
    });
    console.log(token);
    return token;
}

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        userName: Joi.string().required().label("Username"),
        profilePicture: Joi.string().required().label("Profile Picture:"),
        gender: Joi.string().required().label("Gender"),
        age: Joi.number().required().label("Age"),
        frenchLevel: Joi.string().required().label("French Level"),
        speakingLanguages: Joi.string().required().label("Speaking Languages"),
        country: Joi.string().required().label("Country"),
        description: Joi.string().label("Description"),
        instructorType: Joi.string().label("Instructor Type"),
        joined: Joi.string().label("Joined"),
        frenchResources: Joi.string().required().label("French Resources"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = { User, validate }