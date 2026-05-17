export const adminOnly = (
  req,
  res,
  next
) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin only",
    });
  }

  next();
};

export const leaderOnly = (
  req,
  res,
  next
) => {

  if (req.user.role !== "leader") {
    return res.status(403).json({
      message: "Leader only",
    });
  }

  next();
};