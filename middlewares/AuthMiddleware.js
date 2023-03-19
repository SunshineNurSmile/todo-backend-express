import jwt from 'jsonwebtoken';
import validator from 'validator';

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'No token provided!' });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded.id || !validator.isMongoId(decoded.id)) {
    return res.status(401).json({ message: 'JWT malformed!' });
  }

  req.body.userId = decoded.id;

  next();
};

export default AuthMiddleware;
