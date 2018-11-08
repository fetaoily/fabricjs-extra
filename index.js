/* eslint-disable */
const { fabric } = require('fabric');
require('./lib/YxExtDashLine')({ fabric });
require('./lib/YxExtEraserPath')({ fabric });
require('./lib/YxExtEraserBrush')({ fabric });
module.exports = { fabric };
