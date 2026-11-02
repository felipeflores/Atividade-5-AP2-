const { send } = require('../../lib/http');
const store = require('../store');

module.exports = async function deleteOrder(req, res, id) {
  const order = store.findById(id);
  if (!order) return send(res, 404, { erro: 'Pedido não encontrado' });

  store.remove(order);
  send(res, 204);
};
