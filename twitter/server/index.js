// dependencias
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import http from 'http';
import webpackConfig from '../webpack.config';
import app from './app';

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

const ExpressServerUtils = require('express-server-utils')(server, port);

ExpressServerUtils.listen();
ExpressServerUtils.handleOnError();
ExpressServerUtils.handleOnListening();

const exitActions = [server.close];
ExpressServerUtils.handleShutDown(exitActions);

// Webpack Compiler
const webpackCompiler = webpack(webpackConfig);

// Webpack Middlawer
app.use(webpackDevMiddleware(webpackCompiler));

app.use(webpackHotMiddleware(webpackCompiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});
