import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    email:{ type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImg: String,
    verificationToken: String,
    verificationTokenExpire: Date,
    isVerified: {type: Boolean, default: false},
    refreshToken : String,
    resetToken: String,
    resetTokenExpire: Date 
},{timeStamps: true});

export default mongoose.model('users', userSchema);