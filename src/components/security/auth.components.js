import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token, authorization denied" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user data from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    //attach the full user
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (!user || !allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. You do not have permission." });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Role check failed", error });
    }
  };
};

//PROJECT-SPECIFIC ROLE CHECK
export const isProjectManager = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    // Always allow Global Admins to bypass this check
    if (req.user.role === "admin") {
      return next();
    }

    // Check if user is a member of THIS project and has the 'project_manager' role
    const memberData = project.members.find(
      (m) => m.user.toString() === userId.toString()
    );

    if (!memberData || memberData.role !== "project_manager") {
      return res.status(403).json({
        success: false,
        message:
          "Access Denied: You are not a Project Manager for this specific project.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during permission check.",
      error: error.message,
    });
  }
};
