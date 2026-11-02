const { send, readJson } = require('../../lib/http');
const store = require('../store');

module.exports = async function updateOrder(req, res, id) {
  const order = store.findById(id);
  if (!order) return send(res, 404, { erro: 'Pedido não encontrado' });

  const { client, item, status } = (await readJson(req)) || {};

  if (client !== undefined && (typeof client !== 'string' || client.trim() === '')) {
    return send(res, 400, { erro: '"client" não pode ser vazio' });
  }
  if (item !== undefined && (typeof item !== 'string' || item.trim() === '')) {
    return send(res, 400, { erro: '"item" não pode ser vazio' });
  }
  if (status !== undefined && !store.STATUSES.includes(status)) {
    return send(res, 400, { erro: `"status" deve ser: ${store.STATUSES.join(', ')}` });
  }

  if (client !== undefined) order.client = client;
  if (item !== undefined) order.item = item;
  if (status !== undefined) order.status = status;
  send(res, 200, order);
};
