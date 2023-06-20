const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

module.exports = {
  NODE_ENV,
  JWT_SECRET,
};
