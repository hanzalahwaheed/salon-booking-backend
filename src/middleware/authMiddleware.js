import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization; // temporary for dev
    console.log(token);
    // const token = req.headers.authorization;
    if (!token) {
      return res.json({ status: false, message: "unauthorised" });
    }
    const decoded = jwt.verify(token, "jwtkey");
    req.email = decoded.email;
    if (decoded) next();
  } catch (error) {
    console.log("authMiddleware", error);
  }
};

export default authMiddleware;
