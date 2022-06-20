import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { PROJECT_DIRECTORY } from './constants.js';

export const devServer = ({ port }) => ({
  devServer: {
    hot: true,
    port,
    open: true,
  },
});

export const generateSourceMaps = (devtool) => ({
  devtool,
});

export const clean = () => ({
  output: {
    clean: true,
  },
});

export const loadTypescript = () => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
});

export const loadQraphql = () => ({
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
});

export const loadScss = () => ({
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [autoprefixer()] },
            },
          },
          'sass-loader',
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
  ],
});

export const loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: limit } },
        generator: {
          filename: 'images/[contenthash][ext]',
        },
      },
    ],
  },
});

export const loadFonts = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[contenthash][ext]',
        },
      },
    ],
  },
});

export const bundleAnalyze = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],
});

export const resolve = () => ({
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      process: 'process/browser',
      '@components': path.resolve(PROJECT_DIRECTORY, 'src/components'),
    },
  },
});

export const page = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PROJECT_DIRECTORY, 'src/index.html'),
    }),
  ],
});
