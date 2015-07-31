var assert = require("assert");
var stealTools = require("steal-tools");
var bundleAssets = require("../lib/main");
var asap = require("pdenodeify");
var fs = require("fs-extra");
var rimraf = asap(fs.remove);
var exists = require("is-there");

describe("bundling assets", function(){

	before(function(done){
		rimraf(__dirname + "/basics/dist").then(function(){

			this.buildPromise = stealTools.build({
				config: __dirname + "/basics/package.json!npm"
			}, {
				quiet: true
			});

			this.bundlePromise = this.buildPromise.then(bundleAssets);

			return this.bundlePromise;

		}.bind(this)).then(function(){
			done();
		});
	});

	it("moves assets it finds in css", function(){
		assert(
			exists(__dirname + "/basics/dist/images/logo.png"),
			"logo moved to the destination folder"
		);
	});

});
