const serverlessExpress = require('@vendia/serverless-express')
const { createServer } = require("./server");

let serverlessExpressInstance;

async function setup (event, context) {
  const app = await createServer();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

function handler (event, context) {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }
  return setup(event, context);
}

exports.handler = handler
