const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isStart = process.env.NODE_ENV === 'start'


module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    main: './index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@modules' : path.resolve(__dirname, 'src/modules'),
      '@' : path.resolve(__dirname, 'src'),
    }
  },


  module: {
    rules: [
      {
        test: /\.css$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // изменение без перезагрузки css
              hmr: isStart,
              reloadAll: true
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {path: './postcss.config.js'}
            }
          },
        ]
      },{
        test: /\.styl$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // изменение без перезагрузки css
              hmr: isStart,
              reloadAll: true
            },
          },

          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {path: './postcss.config.js'}
            }
          },
          'stylus-loader'
        ]
      },{
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },{
        test: /\.ts$/,
        exclude: '/node_modules/',
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          },
        }
      }
    ]
  },

  devtool: isStart ? 'source-map' : '',

  plugins: [
    // работа с файлами HTML(pug)
    new HTMLWebpackPlugin({
      template: './index.html',
      // сжимать файл HTML
      minify: {
        collapseWhitespace: isProd
      }
    }),

    // очистка dist
    new CleanWebpackPlugin(),

    // извлекает css в отдельный файл
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  devServer: {
    port: 4420,
    hot: isStart
  },


}