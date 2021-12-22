const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("accessToken");
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "User not log in!" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_CODE);

    req.userID = decoded.userID;
    req.email = decoded.email;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, message: "User not log in!" });
  }
};

module.exports = verifyToken;
