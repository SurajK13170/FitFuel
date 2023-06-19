const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, 'CW');
      if (decoded) {
        next();
      } else {
        res.status(401).json({ msg: 'Please Login' });
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  } else {
    res.status(401).json({ msg: 'Please Login' });
  }
};

module.exports = { auth };