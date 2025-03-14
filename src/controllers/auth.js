import User from "../models/User.js";

export const login = async (req, res) => {
    try {
      console.log("Login request body:", req.body);
  
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
  
      console.log("User found:", user);
  
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User not found." });
      }
  
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  
      if (!isPasswordValid) {
        return res.status(httpStatus.FORBIDDEN).json({ success: false, message: "Invalid Password" });
      }
  
      const token = jwt.sign(
        {
          userId: user._id,
          userType: user.userType,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_KEY
      );
  
      user.token = token;
      await user.save();
  
      // Fetch subscription details
      let subscriptionData = null;
      let subscriptionName = null;
      
      if (user.subscriptionId) {
        subscriptionData = await Subscription.findById(user.subscriptionId).lean();
        subscriptionName = subscriptionData ? subscriptionData.name : null;
      }
  
      res.cookie("x-auth-token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        domain: ".ve3.world",
      });
  
      return res.status(httpStatus.CREATED).json({
        success: true,
        message: "User logged in successfully.",
        data: {
          ...user.toObject(),
          subscriptionId: user.subscriptionId,  // Keep subscription ID
          subscriptionData,  // Full 
          subscriptionName,  // Only the subscription name
          token,
        },
      });
  
    } catch (error) {
      console.error("Error in login user:", error);
      return errorResponse(res, error);
    }
  };
