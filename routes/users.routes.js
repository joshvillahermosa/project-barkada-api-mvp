const usersDefinition = require('../resources/users');
const HapiResourceCreator = require('../services/hapi-resource-creator.service');

const jsonDb = require('node-json-db');
const db = new jsonDb('mock/users.json', true, true);

const hapiResourceCreator = new HapiResourceCreator(usersDefinition, db);

module.exports = hapiResourceCreator.returnHapiResourceRoutes();
