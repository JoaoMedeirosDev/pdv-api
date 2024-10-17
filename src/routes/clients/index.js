const { Router } = require('express');
const { verifyBody } = require('../../middlewares/verify-body');
const { clientSchema } = require('../../schemas/clients/client-schema');
const { createClient } = require('../../controllers/clients/create-client');
const { findClients } = require('../../controllers/clients/find-clients');
const { findClientById } = require('../../controllers/clients/find-client');
const { editClient } = require('../../controllers/clients/edit-client');
const { idParamSchema } = require('../../schemas/id-param-schema');
const { verifyIdParam } = require('../../middlewares/verify-id-param');
const { verifyClient } = require('../../middlewares/verify-client');

const clientRoutes = Router();

clientRoutes.post('/cliente', verifyBody(clientSchema), createClient);

clientRoutes.get('/cliente', findClients);
clientRoutes.get(
  '/cliente/:id',
  verifyIdParam(idParamSchema),
  verifyClient,
  findClientById
);

clientRoutes.put(
  '/cliente/:id',
  verifyIdParam(idParamSchema),
  verifyBody(clientSchema),
  editClient
);

module.exports = { clientRoutes };
