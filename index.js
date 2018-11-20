/* eslint-disable */
const { fabric } = require('fabric');
require('./lib/YxExt')({ fabric });
require('./lib/YxExtShape')({ fabric });
require('./lib/YxExtCursor')({ fabric });
require('./lib/YxExtEraser')({ fabric });
module.exports = { fabric };
