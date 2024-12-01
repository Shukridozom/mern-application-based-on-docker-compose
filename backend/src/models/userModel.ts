import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    firstName: string,
    lastName: String,
    email: string,
    passwordHash: string
}

const userSchema: Schema<IUser> = new Schema({
    firstName: {type: String, required: true},
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    passwordHash: {type: String, required: true},
});

export const userModel = mongoose.model<IUser>("Users", userSchema);