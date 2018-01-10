var path = require("path");

/**
 * Remove dots from a relative path
 * @param {String} pth - The path to be stripped out of dots
 * @return {String} The path without the dots
 */
module.exports = function removeDots(pth) {
	return pth
		.split(path.sep)
		.filter(function(p) {
			return p !== "." && p !== "..";
		})
		.join(path.sep);
};
