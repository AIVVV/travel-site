var path = require('path');

module.exports = {
    entry: {
        App: "./src/scripts/app.js",
        Vendor: "./src/scripts/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./app/scripts"),
        filename: "[name].js"
    }, 
    module: {
    	loaders: [
    		{
    			loader: 'babel-loader',
    			query: {
    				presets: ['es2015']
    			},
    			test: /\.js$/,
    			exclude: /node_modules/
    		}
    	]
    }
};