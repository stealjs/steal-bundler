var path = require("path");
var uniq = require("lodash.uniq");
var fs = require("fs-extra");
var asap = require("pdenodeify");

module.exports = bundleAssets;

var handlers = {
	css: require("./css")
};

var pluginExp = /\!.*/;

function bundleAssets(buildResult, options){
	var bundlesPath = buildResult.configuration.bundlesPath;
	var bundles = buildResult.bundles;

	var promises = bundles.map(function(bundle){
		var buildType = bundle.buildType;
		var bundleName = bundle.name;
		var bundlePath = path.join(bundlesPath, bundleName.replace(pluginExp, "").replace("bundles/", ""));

		var handler = handlers[buildType];

		if(handler) {
			debugger;

			var assets = uniq(handler.find(bundle));
			assets.forEach(function(asset){
				asset.src = path.join(path.dirname(bundlePath), asset.path);
				asset.dest = path.join(bundlePath, asset.path);

			});

			// move around the assets
			return moveAssets(assets);
		}
	});

	return Promise.all(promises);
}

function moveAssets(assets){
	return Promise.all(
		assets.map(function(asset){
			return asap(fs.copy)(asset.src, asset.dest);
		})
	);
}

function rewriteContent(assets){

}
