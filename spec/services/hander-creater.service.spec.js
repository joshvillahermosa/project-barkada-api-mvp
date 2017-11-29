const HandlerCreator = require('../../services/handler-creator.service');
const resourceDefinition = require('../fixtures/resource.mock');

/**
 * This is a baseline tests and this needs proper refactoring in order to make this a 
 * efficient tests. We needed this test so we can refactor confidently.
 * 
 * @todo Refactor given time
 */
describe('Handler Creator Service', () => {
  let handlerCreator, db, uniqueIdGenerator,request, reply, code;

  beforeEach(() => {
    //@todo move to mocks
    code = jasmine.createSpy();
    reply = jasmine.createSpy().and.returnValue({
      code
    });

    uniqueIdGenerator = () => { return 'def'}

    handlerCreator = new HandlerCreator({}, {}, resourceDefinition);
  });

  it('should return a object functions to plug into resource creator', () => {
    const handlersToTest = ['getItem', 'getItems', 'postItem', 'getItemProperty', 'updateItem', 'deleteItem'];

    const handlers = handlerCreator.createHandlers();

    handlersToTest.forEach((handlerName) => {
      expect(typeof handlers[handlerName]).toBe('function');
    });
  });

  describe('Handlers with Data', () => {
    let handlers, data;
    beforeEach(() => {
      data = [{id: 'abc', name: 'A'}, {id: 'xyz', name: 'B'}]

      // @todo move to mocks
      db = {
        getData() {
          return data;
        },
        push() {},
        delete() {}
      }
      
      handlerCreator = new HandlerCreator(db, uniqueIdGenerator, resourceDefinition);
      handlers = handlerCreator.createHandlers();
    });

    it('should reply with list of data and respond 200 for single item calls', () => {
      handlers.getItems({}, reply);
      expect(reply).toHaveBeenCalledWith({success: true, data});
      expect(code).toHaveBeenCalledWith(200);
    });

    it('should reply with specific data when called by single id with 200', () => {
      handlers.getItem({params: {id: 'abc'}}, reply);
      expect(reply).toHaveBeenCalledWith({success: true, data: data[0]});
      expect(code).toHaveBeenCalledWith(200);
    });

    it('should reply with specific data property when called by single id and property name with 200', () => {
      handlers.getItemProperty({params: {id: 'abc', property: 'name'}}, reply);
      expect(reply).toHaveBeenCalledWith({success: true, dataId: 'abc', property: {name: 'A'}});
      expect(code).toHaveBeenCalledWith(200);
    });

    it('should successfully post new data and return ID with new data', () => {
      db = {
        push() {},
        getData () {
          return [{id: 'def', name: 'C'}] 
        }
      }

      handlerCreator = new HandlerCreator(db, uniqueIdGenerator, resourceDefinition);
      handlers = handlerCreator.createHandlers();

      handlers.postItem({payload: { item: {name: 'C'}}}, reply);

      expect(reply).toHaveBeenCalledWith({success: true, data: {id: 'def', name: 'C'}});
      expect(code).toHaveBeenCalledWith(201);
    });
  });

  // @todo Add other scenarios
  describe('Handlers with no data', () => {
    let handlers;

    beforeEach(() => {
      db = {
        getData() {
          return [];
        }
      }
      
      handlerCreator = new HandlerCreator(db,{}, resourceDefinition);
      handlers = handlerCreator.createHandlers();
    });

    it('should 404 with no data', () => {
      handlers.getItem({params: {id: 'abc'}}, reply);
      expect(reply).toHaveBeenCalledWith({success: false, error: 'Data not found'});
      expect(code).toHaveBeenCalledWith(404);
    });

    it('should reply 404 if id and property cannot be found', () => {
      handlers.getItemProperty({params: {id: 'abc', property: 'name'}}, reply);
      expect(reply).toHaveBeenCalledWith({success: false, error: 'Item not found'});
      expect(code).toHaveBeenCalledWith(404);
    });
  });
});
