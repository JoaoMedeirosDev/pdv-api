function verifyBody(schema) {
  return async function (req, res, next) {
    try {
      await schema.validateAsync(req.body);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    return next();
  };
}

module.exports = {
  verifyBody,
};
