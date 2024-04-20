import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req.cookies, "<-----diverifyToken");

  const token = req.cookies.myCookie;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(myCookie, process.env.JWT_SECRET, (err, payload) => {
    console.log(payload, "<----diverifyToken");

    if (err) return res.status(403).json({ message: "Token is not Valid!" });

    req.userId = payload.id;

    next();
  });
};
