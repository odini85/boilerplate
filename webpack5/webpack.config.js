const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = (env) => {
  const ENV = require(`./env/${env.env}.json`);
  const IS_PRODUCTION_MODE = env.mode;
  console.log('📝', env, ENV.API_BASE_URL);

  const config = {
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[chunkhash].js',
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          collapseWhitespace: true,
          useShortDoctype: true,
          removeScriptTypeAttributes: true,
        },
      }),
      new CleanWebpackPlugin(),
      new DefinePlugin({
        API_BASE_URL: JSON.stringify(ENV.API_BASE_URL),
        BUILD_AT: JSON.stringify(new Date().toISOString()),
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'assets'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            IS_PRODUCTION_MODE ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./assets/styles/_variables.scss', './assets/styles/_mixins.scss'],
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static',
                name: '[name].[contenthash].[ext]',
              },
            },
          ],
        },
      ],
    },
  };

  const modeFile = `./webpack/${env.mode}.js`;
  return merge(config, require(modeFile));
};
