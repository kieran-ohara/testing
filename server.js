const express = require('express');
const vite = require('vite');
const { readFileSync } = require('fs');
const path = require('path');

const resolve = (p) => path.resolve(__dirname, p)

const serverContext = {
  partner: 'server-partner'
};

const createDevelopmentServer = async (server) => {
  const viteServer = await vite.createServer({
    root: process.cwd(),
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    },
  });
  server.use(viteServer.middlewares);

  server.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;

      let template = readFileSync(resolve('index.html'), 'utf-8');
      template = await viteServer.transformIndexHtml(url, template);
      const manifest = {}

      const { render } = await viteServer.ssrLoadModule(resolve('src/entry-server.ts'))
      const [appHtml, preloadedLinks] = await render(url, manifest);

      const html = template
        .replace('<!--ssr-render-->', appHtml)
        .replace('<!--preload-links-->', preloadedLinks);
        .replace('/* CONTEXT */', `window.__CONTEXT=${JSON.stringify(serverContext)}`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      viteServer.ssrFixStacktrace(e);
      next(e);
    }
  });

  return server;
}

const createProductionServer = async (server) => {
  server.use(express.static('dist/client'));

  server.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    const template = readFileSync(resolve('${__dist/client/index.html'), 'utf-8');
    const manifest = require(resolve('${__dist/client/ssr-manifest.json'));

    const { render } = require(resolve('${__dist/server/entry-server.js'));
    const [appHtml, preloadedLinks] = await render(url, manifest);

    const html = template
      .replace('<!--ssr-render-->', appHtml)
      .replace('<!--preload-links-->', preloadedLinks);
      .replace('/* CONTEXT */', `window.__CONTEXT=${JSON.stringify(serverContext)}`);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  return server;
}

const createServer = async () => {
  const server = express();

  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    await createProductionServer(server);
  } else {
    await createDevelopmentServer(server);
  }

  return server;
}

module.exports = { createServer };
