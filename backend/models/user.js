import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'instructor'],  // <-- added instructor
        default: "user"
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
