const joi = require('joi');
const uniqueIdGenerator = require('uniqid');

const ResourceDefinitionService = require('./resource-definition.service');
const HandlerCreator = require('./handler-creator.service');
const RouteCreator = require('./route-creator.service');

/**
 * @class HapiResourceCreator
 * @description Create a Hapi consumable routes from resource definition
 * @todo Define Schema
 * @todo Add Tests
 * @todo Refactor
 */
class HapiResourceCreator {
  constructor(resourceDefinition, db) {
    // Services
    let resourceDefinitionService, handlerCreator, routeCreator;

    resourceDefinitionService = new ResourceDefinitionService(joi, resourceDefinition);

    // Create the Generated Models
    this.resourceDefinition = resourceDefinitionService.returnUpdatedResourceDefinition();

    // Create the Handlers
    handlerCreator = new HandlerCreator(db, uniqueIdGenerator, this.resourceDefinition);
    this.handlers = handlerCreator.createHandlers();

    //Route Creator to tie it all;
    routeCreator = new RouteCreator(this.handlers, this.resourceDefinition);

    this.resourceRoutes = routeCreator.getRoutes();

    this.returnHapiResourceRoutes = this.returnHapiResourceRoutes.bind(this);
  }

  returnHapiResourceRoutes() {
    return this.resourceRoutes;
  }
}

module.exports = HapiResourceCreator;
