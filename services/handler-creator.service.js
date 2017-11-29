/**
 * @class HandlerCreator
 * @description This creates a handlers for the HAPI API to consume.
 */
class HandlerCreator {

  /**
   * @param {Object} db Instantiated Node JSON DB Object
   * @param {Function} uniqueIdGenerator Function to generate ID
   */
  constructor(db, uniqueIdGenerator, resourceDefinition) {
    
    // Dependencies
    this._db = db;
    this._uniqueIdGenerator = uniqueIdGenerator;

    this.resourceDefinition = resourceDefinition;
    this.lowerCaseResourceName = resourceDefinition.name.toLowerCase();

    /**
     * I really hate this structure
     * @todo Find another way
     */
    this.getItem = this.getItem.bind(this);
    this.getItems = this.getItems.bind(this);
    this.postItem = this.postItem.bind(this);
    this.getItemProperty = this.getItemProperty.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.createHandlers = this.createHandlers.bind(this);
    this._findItemIndex = this._findItemIndex.bind(this);
    this._findSingleItemById = this._findSingleItemById.bind(this);
  }

  createHandlers() {
    return {
      getItem: this.getItem,
      getItems: this.getItems,
      postItem: this.postItem,
      getItemProperty: this.getItemProperty,
      updateItem: this.updateItem,
      deleteItem: this.deleteItem
    }
  }

  /**
   * @method getItems
   * @description Gets a collection of items
   * @param {Object} request Hapi Request 
   * @param {Function} reply Hapi Reply Function
   * @return {Function} Called Hapi Reply function of status codes and data
   */
  getItems(request, reply) {
    const data = this._db.getData('/data');
    return reply({success: true, data}).code(200);
  }
  
  /**
   * @method getItem
   * @description Gets a single item
   * @param {Object} request Hapi Request 
   * @param {Object} request.params Hapi Request Params
   * @param {String} request.params.id Item ID
   * @param {Function} reply Hapi Reply Function
   * @return {Function} Called Hapi Reply of status codes and data
   */
  getItem(request, reply) {
    const data = this._findSingleItemById(request.params.id);
  
    if (data.length === 0) {
      return reply({success: false, error: 'Data not found'}).code(404);
    }
  
    return reply({success: true, data: data[0]}).code(200);
  }

  /**
   * @method getItemProperty
   * @description Gets a single item
   * @param {Object} request Hapi Request 
   * @param {Object} request.params Hapi Request Params
   * @param {String} request.params.id Item ID
   * @param {String} request.params.property Property
   * @param {Function} reply Hapi Reply Function
   * @return {Function} Called Hapi Reply of status codes and data
   */
  getItemProperty(request, reply) {
    let data = this._findSingleItemById(request.params.id);
  
    if (data.length === 0) {
      return reply({success: false, error: 'Item not found'}).code(404);
    }
  
    data = data[0];
  
    if (data[request.params.property] === undefined) {
      console.log(data[request.params.property]);
      return reply({success: false, error: 'Property not found'}).code(404);
    }
  
    const property = {[request.params.property]: data[request.params.property]};
  
    return reply({success: true, dataId: data.id, property}).code(200);
  }
  
  /**
   * @method postItem
   * @description Creates a new item
   * @param {Object} request Hapi Request 
   * @param {Object} request.payload Hapi Request Payload
   * @param {Object} request.payload.event Event Object
   * @param {Function} reply Hapi Reply Function
   * @return {Function} Called Hapi Reply of status codes and data
   * 
   * @todo Add Error Handling
   */
  postItem(request, reply) {
    let item = Object.assign({}, request.payload.data)
    item.id = this._uniqueIdGenerator();
    this._db.push('/data[]', item);
    const postedItem = this._db.getData('/data').filter((currentItem) => {return item.id === currentItem.id});
    return reply({success: true, data: postedItem[0]}).code(201);
  }
  
  /**
   * @method updateItem
   * @description Edits a item
   * @param {Object} request Hapi Request 
   * @param {Object} request.payload Hapi Request Payload
   * @param {Object} request.payload.event Item Object
   * @param {Function} reply Hapi Reply Function
   * @return {Function} Called Hapi Reply of status codes and data
   * 
   * @todo Fix
   */
  updateItem(request, reply) {
    const item = Object.assign({}, request.payload.data);
    const oldItem = this._findSingleItemById(item.id);
  
    if (oldItem.length === 0) {
      return reply({success: false, error: 'Item not found'}).code(404);
    }
  
    const itemIndex = this._findItemIndex(item.id);
    const updatedItem = Object.assign({}, oldItem[0], item);
    this._db.push(`/data[${itemIndex}]`, updatedItem);

    const postedItem = this._findSingleItemById(item.id);
    return reply({success: true, data: postedItem[0]}).code(200);
  }
  
  /**
   * @method deleteItem
   * @description Deletes a single item
   * @param {Object} request Hapi Request 
   * @param {Object} request.params Hapi Request Params
   * @param {String} request.params.id Item ID
   * @param {Function} reply Hapi Reply Function
   * @return {Function} Called Hapi Reply of status codes and data
   */
  deleteItem(request, reply) {
    const item = this._findSingleItemById(request.params.id);
    const itemIndex = this._findItemIndex(request.params.id);
  
    if (item.length === 0) {
      return reply({success: false, error: 'Item not found'}).code(404);
    }
  
    this._db.delete(`/data[${itemIndex}]`);
  
    return reply({success: true, data: item[0]}).code(200);
  }
  
  /**
   * @private
   * @method getItem
   * @description Gets a single event
   * @param {String} id Event ID
   * @return {Object} Array of Single Event
   */
  _findSingleItemById(id) {
    return this._db.getData('/data').filter((currentItem) => {
      return id === currentItem.id
    });
  }
  
  /**
   * @private
   * @method _findItemIndex
   * @param {String} id Event ID
   * @return {Number} Event Index in JSON DB Array
   */
  _findItemIndex(id) {
    return this._db.getData('/data').findIndex((currentItem) => {
      return id === currentItem.id
    });
  }
}

module.exports = HandlerCreator;
