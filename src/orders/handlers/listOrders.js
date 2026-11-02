const { send } = require('../../lib/http');
const store = require('../store');

module.exports = async function listOrders(req, res) {
  send(res, 200, store.list());
};
