import jwt from "jsonwebtoken";
export const sendCookies = (user, res, message, statusCode = 200) => {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      // so that we can send cookies in CROSS platform but using this we can not use this postman
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development " ? false : true,
    })
    .json({
      success: true,
      message: message,
    });
};
