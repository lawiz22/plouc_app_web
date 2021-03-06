const path = require('path');
const paths = require('./paths');
const fs = require('fs');

let API_HOST = 'localhost:8084';
//let API_HOST = 'plouc.live';

const rootDirectory = path.resolve(__dirname, '../');

function resolve(...paths) {
  return fs.realpathSync(path.join(__dirname, ...paths));
}



const webpack = require('webpack');

const babelLoaderConfiguration = {

  test: /\.(js|jsx)$/,
  
  use: {
    loader: 'babel-loader',
    query: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  
  },
  
  // Add every directory that needs to be compiled by Babel during the build
  include: [
    path.resolve(__dirname, './App.js'),
    //path.resolve(__dirname, './src/'),
    path.resolve(rootDirectory, 'node_modules/react-native-drawer-layout'),
    path.resolve(rootDirectory, 'node_modules/react-native-dismiss-keyboard'),
    path.resolve(rootDirectory, 'node_modules/react-native-safe-area-view'),
    path.resolve(rootDirectory, 'node_modules/react-native-tab-view'),
    path.resolve(rootDirectory, 'node_modules/react-native-gesture-handler'),
    
  ]
};

const babelLoaderElement = {
  test: /\.js$/,
  exclude: /node_modules[/\\](?!react-native-paper|react-native-vector-icons|react-native-safe-area-view)/,
  use: {
    loader: 'babel-loader',
    options: {
      // Disable reading babel configuration
      babelrc: false,
      configFile: false,

      // The configration for compilation
      presets: [
        ['@babel/preset-env'],
        '@babel/preset-react',
        '@babel/preset-flow',
        
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread'
      ],
    },
  },
}

const babelLoaderLoad = {
  test: /\.(jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
 
  loader: 'file-loader',
}




const vectorIcon = {
  test: /\.ttf$/,
  loader: "file-loader", // or directly file-loader
  include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
}

const scssLoader = {
  test: /\.(scss|css)$/,
  loaders: [
      'style-loader', 'css-loader', 'sass-loader'
  ]
}



module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'web', 'dist'),
    port: 9000,
  },
  entry: ['babel-polyfill', './src/Web.js'],
 // entry: path.join(__dirname, 'src', 'Web.js'),
  module: {
    rules: [babelLoaderConfiguration,
            babelLoaderElement,
            babelLoaderLoad,
            scssLoader,
            
            
            ]
      
    
  },
  output: {
    path: path.join(__dirname, 'web', 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API_ROOT': JSON.stringify(`http://${API_HOST}`)
    }),
  ],

  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js'],
  },
};
