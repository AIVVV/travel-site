var path = require('path');

module.exports = {
    entry: "./src/scripts/app.js",
    output: {
        path: path.resolve(__dirname, "./app/scripts"),
        filename: "App.js"
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