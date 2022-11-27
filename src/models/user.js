import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: false,
      default: "NA",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UserSchema);

export default Users;