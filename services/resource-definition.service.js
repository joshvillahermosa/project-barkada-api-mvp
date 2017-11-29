/**
 * @class ResourceDefinitionService
 * @description Takes in a defined resource and creates generated models out
 * of the definition
 */
class ResourceDefinitionService {
  constructor(joi, resourceDefinition) {
    const generatedModels = {
      creation: {},
      update: {},
      id: joi.string().required().description(`${resourceDefinition.name}'s ID`),
      property: joi.string().required().description(`${resourceDefinition.name}'s Property`)
    }
    
    this.joi = joi;
    this.resourceDefinition = Object.assign(resourceDefinition, {generatedModels});
    
    this.createCreationModel = this.createCreationModel.bind(this);
    this.createUpdateModel = this.createUpdateModel.bind(this);
    this.returnUpdatedResourceDefinition = this.returnUpdatedResourceDefinition.bind(this);

    this.createCreationModel();
    this.createUpdateModel();
  }

  /**
   * @method createCreationModel
   * @description Will create the Joi models for the creation payload.
   * @return {Object} Updated Resource definition with Creation Model
   */
  createCreationModel() {
    let creation = {};

    const baseModel = this.resourceDefinition.model.base;
    const createdRequiredFields = this.resourceDefinition.model.createdRequired;

    // @todo Move into it's own function
    baseModel.forEach(field => {
      let joiField = this.joi[field.type]();
      if (createdRequiredFields.includes(field.name)) {
        joiField = joiField.required();
      }
      joiField = joiField.description(field.description);

      creation[field.name] = joiField;
    });

    this.resourceDefinition.generatedModels.creation = creation;
  }

  /**
   * @method createUpdateModel
   * @description Will create the Joi models for the creation payload.
   * @return {Object} Updated Resource definition with Creation Model
   */
  createUpdateModel() {
    let update = {};

    const baseModel = this.resourceDefinition.model.base;
    const updatedRequiredFields = this.resourceDefinition.model.updatedRequired;

    // @todo Move into it's own function
    baseModel.forEach(field => {
      let joiField = this.joi[field.type]();
      if (updatedRequiredFields.includes(field.name)) {
        joiField = joiField.required();
      }
      joiField = joiField.description(field.description);

      update[field.name] = joiField;
    });

    this.resourceDefinition.generatedModels.update = update;
  }

  /**
   * Will return the updated generated models
   */
  returnUpdatedResourceDefinition() {
    return this.resourceDefinition;
  }
}

module.exports = ResourceDefinitionService;
