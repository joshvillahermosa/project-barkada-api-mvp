const METHOD_CONSTANTS = require('../services/methods.constants');
const joi = require('joi');

/**
 * @class RouteCreator
 * @description Creates Resource routes to be plugged into Hapi
 * @todo Add Documentation
 * @todo Fix validation props
 * @todo Change name
 */
class RouteCreator {
  constructor(handlers, resourceDefinition) {
    this.handlers = handlers;
    this.resourceDefinition = resourceDefinition;
    this.lowerCaseResourceName = resourceDefinition.name.toLowerCase();
    this.pluralLowerCaseResourceName = resourceDefinition.pluralName.toLowerCase();
    this.basePath = `/${this.pluralLowerCaseResourceName}`;
    this.resourceDefinitionId = resourceDefinition.generatedModels.id;
    this.resourceDefinitionProperty = resourceDefinition.generatedModels.property;

    // Default Routes
    this.deleteItemRouteDefinition = {};
    this.getListRouteDefinition = {}
    this.getItemRouteDefinition = {};
    this.getItemPropertyRouteDefinition = {};
    this.postItemRouteDefinition = {};
    this.updateItemRouteDefinition = {};

    this.createRoutes = this.createRoutes.bind(this);
    this.createRoutes(handlers, resourceDefinition);

    this.createDeleteItemRoute = this.createDeleteItemRoute.bind(this);
    this.createGetListRoute = this.createGetListRoute.bind(this);
    this.createGetItemRoute = this.createGetItemRoute.bind(this);
    this.createGetItemPropertyRoute = this.createGetItemPropertyRoute.bind(this);
    this.createPostItemRoute = this.createPostItemRoute.bind(this);
    this.createUpdateItemRoute = this.createUpdateItemRoute.bind(this);

    this.getRoutes = this.getRoutes.bind(this);
  }

  createRoutes(handlers, resourceDefinition) {
    this.deleteItemRouteDefinition = this.createDeleteItemRoute(handlers, resourceDefinition);
    this.getListRouteDefinition = this.createGetListRoute(handlers, resourceDefinition);
    this.getItemRouteDefinition = this.createGetItemRoute(handlers, resourceDefinition);
    this.getItemPropertyRouteDefinition = this.createGetItemPropertyRoute(handlers, resourceDefinition);
    this.postItemRouteDefinition = this.createPostItemRoute(handlers, resourceDefinition);
    this.updateItemRouteDefinition = this.createUpdateItemRoute(handlers, resourceDefinition);
  }

  createDeleteItemRoute(handlers, resourceDefinition) {
    return {
      method: METHOD_CONSTANTS.DELETE,
      path: `${this.basePath}/{id}`,
      handler: handlers.deleteItem,
      config: {
        tags: ['api', this.lowerCaseResourceName],
        description: `Delete a ${this.lowerCaseResourceName}`,
        notes: `Will Delete a ${this.lowerCaseResourceName} and return the deleted ${this.lowerCaseResourceName} if successful. **Receiving the deleted ${this.lowerCaseResourceName} will be the last time to see the deleted ${this.lowerCaseResourceName}**`,
        validate: {
          params: {
            id: this.resourceDefinitionId
          }
        }
      }
    }
  }

  createGetListRoute(handlers, resourceDefinition) {
    return {
      method: METHOD_CONSTANTS.GET,
      path: this.basePath,
      handler: handlers.getItems,
      config: {
        tags: ['api', this.lowerCaseResourceName],
        description: `Gets ${this.pluralLowerCaseResourceName}`,
        notes: `Will return a list of ${this.pluralLowerCaseResourceName}`
      }
    }
  }

  createGetItemRoute(handlers, resourceDefinition) {
    return {
      method: METHOD_CONSTANTS.GET,
      path: `${this.basePath}/{id}`,
      handler: handlers.getItem,
      config: {
        tags: ['api', this.lowerCaseResourceName],
        description: `Gets a ${this.lowerCaseResourceName}`,
        notes: `Will return a single ${this.lowerCaseResourceName}`,
        validate: {
          params: {
            id: this.resourceDefinitionId
          }
        }
      }
    }
  }

  createGetItemPropertyRoute(handlers, resourceDefinition) {
    return {
      method: METHOD_CONSTANTS.GET,
      path: `${this.basePath}/{id}/property/{property}`,
      handler: handlers.getItemProperty,
      config: {
        tags: ['api', this.lowerCaseResourceName],
        description: `Gets single ${this.lowerCaseResourceName} property`,
        notes: `Will a get a ${this.lowerCaseResourceName} property by ID and Property Name`,
        validate: {
          params: {
            id: this.resourceDefinitionId,
            property: this.resourceDefinitionProperty,
          }
        }
      }
    }
  }

  /**
   * @method createPostItemRoute
   * @description Creates POST /item route
   * @param {Object} handlers Object of handler functions
   * @param {Object} resourceDefinition
   * @return {Object} Returns Create Item route
   * 
   * @todo Review TODO Below
   */
  createPostItemRoute(handlers, resourceDefinition) {
    /**
     * @todo Really this logic should be part of Resource Definition Service,
     * but for MVP purposes it will be here
     */
    const creationDataValidation = Object.assign({}, this.resourceDefinition.generatedModels.creation);

    delete creationDataValidation.id;
     // END TODO

    return {
      method: METHOD_CONSTANTS.POST,
      path: this.basePath,
      handler: handlers.postItem,
      config: {
        tags: ['api', this.lowerCaseResourceName],
        description: `Post a ${this.lowerCaseResourceName}`,
        notes: `Will Post a ${this.lowerCaseResourceName} and return the posted even if successful`,
        validate: {
          payload: {
            data: creationDataValidation
          }
        }
      }
    }
  }

  createUpdateItemRoute(handlers, resourceDefinition) {
    return {
      method: METHOD_CONSTANTS.PUT,
      path: this.basePath,
      handler: handlers.updateItem,
      config: {
        tags: ['api', this.lowerCaseResourceName],
        description: `Updates a ${this.lowerCaseResourceName}`,
        notes: `Will update a ${this.lowerCaseResourceName} and return updated ${this.lowerCaseResourceName} if successful`,
        validate: {
          payload: {
            data: this.resourceDefinition.generatedModels.update
          }
        }
      }
    }
  }

  getRoutes() {
    return {
      [`delete_${this.lowerCaseResourceName}`]: this.deleteItemRouteDefinition,
      [`get_${this.pluralLowerCaseResourceName}`]: this.getListRouteDefinition,
      [`get_${this.lowerCaseResourceName}`]: this.getItemRouteDefinition,
      [`get_${this.lowerCaseResourceName}_property`]: this.getItemPropertyRouteDefinition,
      [`post_${this.lowerCaseResourceName}`]: this.postItemRouteDefinition,
      [`update_${this.lowerCaseResourceName}`]: this.updateItemRouteDefinition
    }
  }
}

module.exports = RouteCreator;
