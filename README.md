# steal-bundler

## Use

```js
var stealTools = require("steal-tools");
var bundleAssets = require("steal-bundler");

stealTools.build){
	config: __dirname + "/package.json!npm"
}).then(function(buildResult){

	bundleAssets(buildResult, {
		glob: "images/**/*"
	});

});
```
