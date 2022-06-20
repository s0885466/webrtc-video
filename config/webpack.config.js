import path from 'path';
import getPort from 'get-port';
import { merge } from 'webpack-merge';
import webpack from 'webpack';
import * as parts from './webpack.parts.js';
import { PROJECT_DIRECTORY, PORT } from './constants.js';

const commonConfig = merge([
  { entry: path.resolve(PROJECT_DIRECTORY, 'src/index.tsx') },
  {
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(PROJECT_DIRECTORY, 'dist'),
    },
  },
  {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  },
  parts.resolve(),
  parts.clean(),
  parts.loadScss(),
  parts.loadImages({ limit: 15000 }),
  parts.loadFonts(),
  parts.loadTypescript(),
  parts.loadQraphql(),
  parts.page(),
]);

const productionConfig = merge([
  parts.bundleAnalyze(),
  {
    output: {
      chunkFilename: 'js/[name].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
    },
  },
  {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        cacheGroups: {
          defaultVendors: {
            filename: 'js/vendor-[name].bundle.js',
          },
        },
      },
      runtimeChunk: { name: 'runtime' },
    },
  },
  {
    performance: {
      hints: 'warning', // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 100000, // in bytes
    },
  },
]);

const developmentConfig = async ({ port }) => {
  const availablePort = await getPort({ port });

  return merge([
    parts.devServer({ port: availablePort }),
    parts.generateSourceMaps('inline-source-map'),
  ]);
};

export const getConfig = async (mode) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode });
    case 'development': {
      const devConfig = await developmentConfig({ port: PORT });

      return merge(commonConfig, devConfig, {
        mode,
      });
    }

    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};
