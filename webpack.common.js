const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());
const texturesPath = path.resolve(__dirname, 'textures');
const hasTextures = fs.existsSync(texturesPath);

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/babylonBundle.js',  
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|env|glb|stl)$/i,
        include: hasTextures ? texturesPath : undefined,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 19192,
              name: hasTextures ? '/textures/[name].[ext]' : '[name].[ext]',
              publicPath: hasTextures ? 'textures/' : '',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "index.html"),
    }),
    hasTextures &&
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'textures',
            to: 'textures',
            globOptions: {
              dot: true,
              ignore: ['**/.gitkeep'],
            },
          },
        ],
      }),
  ].filter(Boolean),
};
