/* eslint-disable */
const { fabric } = require('fabric');
require('./lib/YxExt')({ fabric });
require('./lib/YxExtDashLine')({ fabric });
require('./lib/YxExtSolidLine')({ fabric });
require('./lib/YxExtCircle')({ fabric });
require('./lib/YxExtShapeSquare')({ fabric });
require('./lib/YxExtShapeRectangle')({ fabric });
require('./lib/YxExtEraserPath')({ fabric });
require('./lib/YxExtEraserBrush')({ fabric });
module.exports = { fabric };
