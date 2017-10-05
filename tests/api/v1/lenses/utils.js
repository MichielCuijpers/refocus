/**
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * tests/api/v1/lenses/utils.js
 */
'use strict'; // eslint-disable-line strict
const tu = require('../../../testUtils');
const path = require('path');
const fs = require('fs');

const testStartTime = new Date();
const name = `${tu.namePrefix}testLensName`;
const willSendthis = fs.readFileSync(
  path.join(__dirname,
    '../apiTestsUtils/lens.zip')
);

/**
 * @param {Object} an input to Lens.create
 */
function getLens() {
  return { name,
    sourceName: 'testSourceLensName',
    description: 'test Description',
    sourceDescription: 'test Source Description',
    isPublished: true,
    library: willSendthis,
  }
};

module.exports = {
  name,
  getLens,
  doSetup(userId) {
    return new tu.db.Sequelize.Promise((resolve, reject) => {
      const lens = getLens();
      if (userId) {
        lens.installedBy = userId;
      }
      tu.db.Lens.create(lens)
      .then((createdLens) => resolve(createdLens))
      .catch((err) => reject(err));
    });
  },

  forceDelete(done) {
    tu.forceDelete(tu.db.Perspective, testStartTime)
    .then(() => tu.forceDelete(tu.db.Lens, testStartTime))
    .then(() => done())
    .catch(done);
  },
};
