const { send, readJson } = require('../../lib/http');
const store = require('../store');

module.exports = async function createOrder(req, res) {
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

  send(res, 201, store.create({ client, item, status }));
};
