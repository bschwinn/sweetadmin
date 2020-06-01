const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 8083
const dev = (process.env.NODE_ENV !== 'production')

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/admin/users', (req, res) => {
    return app.render(req, res, '/users', req.query)
  })

  server.get('/admin/users/:username', (req, res) => {
    return app.render(req, res, '/users/[username]', req.query)
  })

  server.get('/admin/apps', (req, res) => {
    return app.render(req, res, '/apps', req.query)
  })

  server.get('/admin/apps/:appname', (req, res) => {
    return app.render(req, res, '/apps/[appname]', req.query)
  })

  server.get('/admin/searches', (req, res) => {
    return app.render(req, res, '/searches', req.query)
  })

  server.get('/admin/searches/:searchname', (req, res) => {
    return app.render(req, res, '/searches/[searchname]', req.query)
  })

  server.get('/admin/settings', (req, res) => {
    return app.render(req, res, '/settings', req.query)
  })

  server.get('/admin/', (req, res) => {
    return app.render(req, res, '/settings', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res);
  })

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`server running on port: ${port}, base url: ${process.env.BASE_URL}`);
  })
});