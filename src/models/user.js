import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userModel = new Schema(
  {
    username: {
      type: String,
      required: [true, "Name must be provided"],
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
    },
    userType: {
      type: Number, // 1: admin, 2: generalUser, 3: blockedUser
      required: true,
      default: 2,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: false,
      },
    ],
    permissions: {
      type: Map,
      of: Boolean,
      default: {},
    },
    SSOToken: {
      type: String,
      default: "",
    },
    EntraIdAccessToken: {
      type: String,
      default: "",
    },
    userGroup: {
      type: Array,
      default: [],
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: false,
    },
    passwordResetToken: {
      type: String,
      required: false,
    },
    passwordResetExpires: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userModel.statics.getUserTypeById = async function (userId) {
  try {
    const user = await this.findById(userId, "userType");
    if (!user) {
      throw new Error("User not found");
    }
    return user.userType;
  } catch (error) {
    console.error("Error fetching userType:", error);
    throw error;
  }
};

userModel.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      username: this.username,
      userType: this.userType,
      email: this.email,
      roles: this.roles,
      permissions: Object.fromEntries(this.permissions || {}),
    },
    process.env.JWT_KEY
  );
  return token;
};

export default mongoose.model("User", userModel);
