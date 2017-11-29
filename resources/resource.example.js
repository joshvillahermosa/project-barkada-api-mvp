/**
 * # Example Resource Definition
 * 
 * The Hapi Resource Creator (HRC) consumes this definition that creates the
 * CRUD API. By Default it will create the following:
 * * GET resources
 * * GET resources/{id}
 * * GET resources/{id}/property/{propertyId}
 * * POST resources
 * * PUT resources
 * * DELETE resources/{id}
 * 
 * ## TODOS
 * @todo HRC to auto create ID Field
 * @todo Field to exclude CRUD Operations
 * @todo New Model Field to include other models. Example if we have a array of
 * Resource IDs, HRC can include a option to replace Resource ID with the actual
 * Resource.
 */
const ExampleResourceDefinition = {
  name: 'Resouce Name',                 // Resource Name
  pluralName: 'Users',                  // Plural name for Resource Name
  model: {                              // Resource Model Definition
    base: [                             // Base Model, Array of Obj
      {
        name: 'id',                     // REQUIRED -- See todo noted above
        type: 'string',
        description: 'ID of Resource'
      },{
        name: 'name',                   // Name of Property
        type: 'string',                 // Type of Property (string, num, array)
        description: 'User Name'        // Description of Array
      }
    ],
    createdRequired: ['name'],          // Required fields from model when created
    updatedRequired: ['id']             // Required fields from model when updating
  }
}

module.exports = ExampleResourceDefinition; // EXPORT
