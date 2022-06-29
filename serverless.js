const serverlessExpress = require('@vendia/serverless-express')
const { createServer } = require("./server");

async function setup (event, context) {
  const server = await createServer();
  return serverlessExpress({ app: server });
}

function handler (event, context) {
  return setup(event, context)
}

exports.handler = handler
