import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
    _id: number;
    email: string;
    avatar: string;
    name: string;
}

const UserSchema = new mongoose.Schema({
    _id: {
      type: Number,
      required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.model<UserDocument>("AuthUser", UserSchema);