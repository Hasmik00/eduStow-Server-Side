import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    throw new Error('Access is denied');
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    throw new Error('Invalid token');
  }
  return next();
};

export const retrieveUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (token) {
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!req.user) {
      throw new Error('not Authenticated');
    }
    req.user = decodedToken.user;
    console.log('user: ', req.user);
    next();
  }
  throw new Error('not Authenticated');
};
