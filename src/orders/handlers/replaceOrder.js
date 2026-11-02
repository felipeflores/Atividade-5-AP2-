const { send, readJson } = require('../../lib/http');
const store = require('../store');

module.exports = async function replaceOrder(req, res, id) {
  const order = store.findById(id);
  if (!order) return send(res, 404, { erro: 'Pedido não encontrado' });

  const { client, item, status } = (await readJson(req)) || {};

  if (typeof client !== 'string' || client.trim() === '') {
    return send(res, 400, { erro: '"client" é obrigatório' });
  }
  if (typeof item !== 'string' || item.trim() === '') {
    return send(res, 400, { erro: '"item" é obrigatório' });
  }
  if (status !== undefined && !store.STATUSES.includes(status)) {
    return send(res, 400, { erro: `"status" deve ser: ${store.STATUSES.join(', ')}` });
  }

  order.client = client;
  order.item = item;
  order.status = status || 'pendente';
  send(res, 200, order);
};
