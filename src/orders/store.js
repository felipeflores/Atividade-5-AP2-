const STATUSES = ['pendente', 'pronto', 'cancelado'];

const orders = [];
let nextId = 1;

const list = () => orders;

function create({ client, item, status }) {
  const order = { id: nextId++, client, item, status: status || 'pendente' };
  orders.push(order);
  return order;
}

const findById = (id) => orders.find((order) => order.id === Number(id));

function remove(order) {
  orders.splice(orders.indexOf(order), 1);
}

module.exports = { STATUSES, list, create, findById, remove };
