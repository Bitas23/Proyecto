import jwt from 'jsonwebtoken';

const createToken = auth =>
  jwt.sign(
    {
      id: auth.id,
    },
    'my-secret',
    {
      expiresIn: 60 * 120,
    },
  );

export const generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  next();
};
export const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(JSON.stringify({ tokens: req.body, user: req.user }));
};
