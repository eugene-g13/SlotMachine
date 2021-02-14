const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[fullhash].js"
    },
    devServer: {
        port: 3000,
        open: 'Google Chrome'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: { publicPath: '../../' },
                },
                "css-loader", 
                {
                    loader: "postcss-loader",
                    options: {
                    postcssOptions: {
                        plugins: [
                        [
                            "postcss-preset-env",
                            "autoprefixer",
                        ],
                        ],
                    }, 
                    },
                },
                "sass-loader"
            ]
        },
        {
            test: /\.(jpg|jpeg|png|svg|gif)$/,
            use: ["file-loader"]
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
            }
        },
        {
            test: /\.m?jsx$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: [['@babel/preset-env', { "debug": true}], '@babel/preset-react']
            }
            }
        }
    ]
    }


}