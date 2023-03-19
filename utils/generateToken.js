import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

export default generateToken;
