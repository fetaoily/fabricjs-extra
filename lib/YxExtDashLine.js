import { fabric } from 'fabric'

(function (global) {
  'use strict';
  var fabric = global.fabric || (global.fabric = {}),
    extend = fabric.util.object.extend;

  if (fabric.YxExtDashLine) {
    fabric.warn('fabric.YxExtDashLine is already defined');
    return;
  }

  /**
   * YxExtDashLine class
   * @class fabric.YxExtDashLine
   * @extends fabric.Object
   * @see {@link fabric.YxExtDashLine#initialize} for constructor definition
   */
  fabric.YxExtDashLine = fabric.util.createClass(fabric.Line, /** @lends fabric.YxExtDashLine.prototype */ {

    /**
     * Type of an object
     * @type String
     * @default
     */
    type: 'line',
    typeExt: 'YxExtDashLine',
    strokeDashArray: [10, 5],

    /**
     * Constructor
     * @param {Array} [points] Array of points
     * @param {Object} [options] Options object
     * @return {fabric.YxExtDashLine} thisArg
     */
    initialize: function (points, options) {
      this.callSuper('initialize', points, options);
    },

    /**
     * Returns object representation of an instance
     * @method toObject
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject: function (propertiesToInclude) {
      return extend(this.callSuper('toObject', propertiesToInclude), {
        typeExt: this.typeExt
      });
    }
  });
})({ fabric });
