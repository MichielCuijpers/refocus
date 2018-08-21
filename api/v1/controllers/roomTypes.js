/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * api/v1/controllers/roomTypes.js
 */
'use strict';

const helper = require('../helpers/nouns/roomTypes');
const doDeleteAllAssoc = require('../helpers/verbs/doDeleteAllBToMAssoc');
const doDeleteOneAssoc = require('../helpers/verbs/doDeleteOneBToMAssoc');
const doGetWriters = require('../helpers/verbs/doGetWriters');
const doPostWriters = require('../helpers/verbs/doPostWriters');
const doDelete = require('../helpers/verbs/doDelete');
const doFind = require('../helpers/verbs/doFind');
const doGet = require('../helpers/verbs/doGet');
const doPatch = require('../helpers/verbs/doPatch');
const doPost = require('../helpers/verbs/doPost');
const doPut = require('../helpers/verbs/doPut');

module.exports = {

  /**
   * DELETE /roomTypes/{key}
   *
   * Deletes the roomType and sends it back in the response.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  deleteRoomTypes(req, res, next) {
    doDelete(req, res, next, helper);
  },

  /**
   * GET /roomTypes
   *
   * Finds zero or more roomTypes and sends them back in the response.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  findRoomTypes(req, res, next) {
    doFind(req, res, next, helper);
  },

  /**
   * GET /roomTypes/{key}
   *
   * Retrieves the roomType and sends it back in the response.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  getRoomType(req, res, next) {
    doGet(req, res, next, helper);
  },

  /**
   * PATCH /roomTypes/{key}
   *
   * Update the specified roomType
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  patchRoomType(req, res, next) {
    doPatch(req, res, next, helper);
  },

  /**
   * POST /roomTypes
   *
   * Creates a new roomType and sends it back in the response.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  postRoomTypes(req, res, next) {
    doPost(req, res, next, helper);
  },

  /**
   * GET /roomTypes/{key}/writers
   *
   * Returns a list of users permitted to modify this roomType. DOES NOT use
   * wildcards.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  getRoomTypeWriters(req, res, next) {
    doGetWriters.getWriters(req, res, next, helper);
  }, // getRoomTypeWriters

  /**
   * POST /roomTypes/{key}/writers
   *
   * Add one or more users to a roomType's list of authorized writers.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  postRoomTypeWriters(req, res, next) {
    doPostWriters(req, res, next, helper);
  }, // postRoomTypeWriters

  /**
   * GET /roomTypes/{key}/writers/{userNameOrId}
   *
   * Determine whether a user is an authorized writer for a RoomType. If user is
   * unauthorized, there is no writer by this name for this roomType.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  getRoomTypeWriter(req, res, next) {
    doGetWriters.getWriter(req, res, next, helper);
  }, // getRoomTypeWriter

  /**
   * DELETE /roomTypes/{key}/writers/{userNameOrId}
   *
   * Remove a user from a roomType's list of authorized writers.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
   */
  deleteRoomTypeWriter(req, res, next) {
    const userNameOrId = req.swagger.params.userNameOrId.value;
    doDeleteOneAssoc(req, res, next, helper,
        helper.belongsToManyAssoc.users, userNameOrId);
  }, // deleteRoomTypeWriter

  /**
   * DELETE /roomTypes/{keys}/writers
   *
   * Deletes all the writers associated with this resource.
   *
   * @param {IncomingMessage} req - The request object
   * @param {ServerResponse} res - The response object
   * @param {Function} next - The next middleware function in the stack
  */
  deleteRoomTypeWriters(req, res, next) {
    doDeleteAllAssoc(req, res, next, helper, helper.belongsToManyAssoc.users);
  }, // deleteRoomTypeWriters

}; // exports
