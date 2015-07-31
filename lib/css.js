var regexAll = require("./regex_all");

var urlExp = /url\(["']?(.+)["']?\)/g;

exports.find = function(bundle){
	var nodes = bundle.nodes || [];

	return nodes.map(function(node){
		var source = node.activeSource.code;

		var results = regexAll(urlExp, source);

		if(results.length) {
			return results.map(function(res){
				return { path: res[1] };
			});
		}

	}).filter(truthy)
		.reduce(flatten);
};

exports.rewrite = function(source){

};

function truthy(t){
	return !!t;
};

function flatten(a, b){
	return a.concat(b);
}
