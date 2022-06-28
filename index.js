const { createServer } = require("./server");
const { PORT=3000 } = process.env;

(async () => {
  const server = await createServer();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
