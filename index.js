/* eslint-disable */
const { fabric } = require('fabric');
require('./lib/YxExt')({ fabric });
require('./lib/YxExtShape')({ fabric });
require('./lib/YxExtEraserPath')({ fabric });
require('./lib/YxExtEraserBrush')({ fabric });
module.exports = { fabric };
