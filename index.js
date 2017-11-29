/**
 * Project Barkada API Rest Server
 */
const _ = require('lodash');
const Hapi = require('hapi');
const server = new Hapi.Server();
const version = require('./package').version;

const registrationConf = require('./configs/server.registration');
const routes = require('./routes');
const prefix = `/api/v${version.slice(0, -4)}`;

const serverConf = {
  host: 'localhost',
  port: process.env.PORT || 8081
};

const serverStartHandler = function(err) {
  if (err) {
  	throw err
  }

  console.log('Server is running on: ' + server.info.uri);
}

// Ordering matters
server.connection(serverConf);
server.realm.modifiers.route.prefix = prefix;

_.forEach(routes, (value) => {
  server.route(value);
});

// @todo Restructure
server.register(registrationConf, (err) => {
  if (err) {
  	throw err
  }

  server.start(serverStartHandler);
});
