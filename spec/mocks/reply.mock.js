/**
 * @function replyMock
 * @description Mock Hapi Reply
 * @param {Object} ReplyObject Hapi Reply Object
 * @return {Object} Object that contains functions to mock Hapi Reply calls
 */
function replyMock(replyObject) {
  return {code: codeMock}
}

/**
 * @function codeMock
 * @description Mock Reply Code Call
 * @param {Number} HTTPStatusCode 
 */
function codeMock(HTTPStatusCode) {}

module.exports = jasmine.createSpy().and.callFake(replyMock);
