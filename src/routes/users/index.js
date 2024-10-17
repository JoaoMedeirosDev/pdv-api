const { Router } = require('express');
const {
  authenticateSchema,
} = require('../../schemas/users/authenticate-schema');
const { authenticate } = require('../../controllers/users/authenticate');
const { createUser } = require('../../controllers/users/create-user');
const { userSchema } = require('../../schemas/users/userSchema');
const { verifyJwt } = require('../../middlewares/verify-jwt');
const { profile } = require('../../controllers/users/profile');
const { updateUser } = require('../../controllers/users/update-user');
const { verifyBody } = require('../../middlewares/verify-body');

const userRoutes = Router();

userRoutes.post('/login', verifyBody(authenticateSchema), authenticate);
userRoutes.post('/usuario', verifyBody(userSchema), createUser);

userRoutes.use(verifyJwt);

userRoutes.get('/usuario', profile);

userRoutes.put('/usuario', verifyBody(userSchema), updateUser);

module.exports = { userRoutes };
