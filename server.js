const http = require('node:http');
const router = require('./src/router');
const { send } = require('./src/lib/http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (error) {
    console.error(error);
    send(res, 500, { erro: 'Erro interno do servidor' });
  }
});

server.listen(PORT, () => {
  console.log(`Dev Coffee API em http://localhost:${PORT}`);
});
