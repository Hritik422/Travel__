import jwt from "jsonwebtoken";

// Verify JWT on every admin request
export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ responseCode: 401, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    if (!decoded.isAdmin) {
      return res.status(403).json({ responseCode: 403, message: "Access denied" });
    }
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ responseCode: 401, message: "Invalid or expired token" });
  }
};
