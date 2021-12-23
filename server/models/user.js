import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    photo: String,
    email: {
      type: String,
      required: [true, "email is required"],
      minlength: 1,
      trim: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: {
        values: ["ADMIN", "USER"],
        default: "USER",
        message: "role must be one of 'ADMIN', 'USER'",
      },  
      required: true
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: "User with same {PATH} already exists",
});

UserSchema.statics.encryptPassword = (password) =>
  new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error.message);
    }
  });

const User = mongoose.models.User || mongoose.model("User", UserSchema); 

export default User;
