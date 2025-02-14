import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
