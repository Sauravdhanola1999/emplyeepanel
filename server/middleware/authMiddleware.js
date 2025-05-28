export default (req, res, next) => {
  if (!req.cookies.username) {
    console.log("Incoming cookies:", req.cookies);
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  next();
};
