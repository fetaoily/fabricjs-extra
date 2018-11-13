/* eslint-disable */
const { fabric } = require('fabric');
require('./lib/YxExt')({ fabric });
require('./lib/YxExtShapeDashLine')({ fabric });
require('./lib/YxExtSolidLine')({ fabric });
require('./lib/YxExtShapeCircle')({ fabric });
require('./lib/YxExtShapeSquare')({ fabric });
require('./lib/YxExtShapeRectangle')({ fabric });
require('./lib/YxExtEraserPath')({ fabric });
require('./lib/YxExtEraserBrush')({ fabric });
module.exports = { fabric };
