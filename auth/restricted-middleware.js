module.exports = restricted;

function restricted(req, res, next) {
  console.log("in middleware", req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Error" });
  }
}
