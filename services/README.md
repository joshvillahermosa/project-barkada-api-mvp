# Services
This folder contains API Services. Most of the services contained in here are used to support Hapi Resource Creator. Brief description of services

## Hapi Resource Creator (HRC)
This service will take in a [resource definition](../resources/resource.example.js) and create a HAPI Server Object with all it's CRUD operations.

### Example Use
To be used in the `/resources` folder.

```js
const resourceDefinition = require('../resources/resource');
const HapiResourceCreator = require('../services/hapi-resource-creator.service');

const jsonDb = require('node-json-db');
// A DB instance will need to be passed in.
const db = new jsonDb('mock/resource.json', true, true);

const hapiResourceCreator = new HapiResourceCreator(resourceDefinition, db);

module.exports = hapiResourceCreator.returnHapiResourceRoutes();
```

The following will create the output

```js
[ 
  resourceProperty: {
    method: 'GET', // GET is just a sample
    path: '/resource/{id}/property/{property}',
    handler: (request, reply) => {
      // Some code that calls request and reply
    },
    config: {
      tags: ['api', 'resource name'],
      description: 'Resource Description',
      notes: 'Resource Notes',
      validate: {
        params: { // This part will vary depending on type
          id: joi.string().required().description('ID of the Resource'),
          property: joi.string().required().description('Property of the Resource')
        }
      }
    }
  }
...
]

```

### CRUD Operations created
* GET resources
* GET resources/{id}
* GET resources/{id}/property/{propertyId}
* POST resources
* PUT resources
* DELETE resources/{id}

### Internal Flow
How HRC works:
1. HRC takes in the resource definition and DB instance
1. HRC then passes to Resource Definition Service to transform into a base definition
1. HRC then passes to Handler Creator to create route handlers
1. Taking the output of Resource Definition Service and Handler Creator and passed it into Route Creator
1. HRC returns the output of Route Creator as the final product.

See service definitions below

### Resource Definition Service
Sub Service of HRC. This process the resource definition passed in and creates the base object for Route Creator

### Handler Creator
Sub service of HRC that creates Handlers for incoming request and responses. Used later for Route Creator.

### Route Creator
Sub Service of HRC. This takes in the out put of Resource Definition Service and Handler Creator to return the final route objects.

## Methods Constants
Holds constant for GET, POST, PUT, DELETE strings

## Properties Constants
TBD if to delete.
