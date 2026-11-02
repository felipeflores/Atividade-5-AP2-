const { send } = require('./lib/http');
const listOrders = require('./orders/handlers/listOrders');
const createOrder = require('./orders/handlers/createOrder');
const getOrder = require('./orders/handlers/getOrder');
const replaceOrder = require('./orders/handlers/replaceOrder');
const updateOrder = require('./orders/handlers/updateOrder');
const deleteOrder = require('./orders/handlers/deleteOrder');

module.exports = async function router(req, res) {
  const { method } = req;
  const { pathname } = new URL(req.url, 'http://localhost');

  const [resource, id, extra] = pathname.split('/').filter(Boolean);
  const isCollection = resource === 'orders' && id === undefined;
  const isItem = resource === 'orders' && id !== undefined && extra === undefined;

  if (method === 'GET' && isCollection) return listOrders(req, res);
  if (method === 'POST' && isCollection) return createOrder(req, res);
  if (method === 'GET' && isItem) return getOrder(req, res, id);
  if (method === 'PUT' && isItem) return replaceOrder(req, res, id);
  if (method === 'PATCH' && isItem) return updateOrder(req, res, id);
  if (method === 'DELETE' && isItem) return deleteOrder(req, res, id);

  send(res, 404, { erro: 'Rota não encontrada' });
};
