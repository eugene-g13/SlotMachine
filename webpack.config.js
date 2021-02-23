const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const postcssNormalize = require("postcss-normalize");

module.exports = {
    mode: "development",
    entry: [
        "@babel/polyfill",
        "./src/index.jsx",
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[fullhash].js",
        //publicPath: "/", // now in Webpack 5 determined automatically if possible
    },
    target: "web", // ! Live reloading bug fix. (for Webpack 5) 
    // target: ["web", "es2020"], not working
    devtool: 'eval', // compilation x2 faster
    cache: { type: "filesystem"},
    devServer: {
        port: 3000,
        open: 'Google Chrome',
        contentBase: path.resolve(__dirname, "dist"),
        //contentBase: path.resolve(__dirname, "dist"),
        contentBase: "./dist",
        //publicPath: "/dist",
        hot: true,
        //open: true
    },
    resolve: {
        extensions: [".js", ".jsx"],
        fallback: { "path": false }
    },
    plugins: [
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        // new ReactRefreshWebpackPlugin({
        //     overlay: {
        //       entry: webpackDevClientEntry,
        //       // The expected exports are slightly different from what the overlay exports,
        //       // so an interop is included here to enable feedback on module-level errors.
        //       module: reactRefreshOverlayEntry,
        //       // Since we ship a custom dev client and overlay integration,
        //       // the bundled socket handling logic can be eliminated.
        //       sockIntegration: false,
        //     },
        //   }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "../../" },
                    },
                    "css-loader",
                    // {
                    //     loader: require.resolve('postcss-loader'),
                    //     // loader: "postcss-loader",
                    //     options: {
                    //         ident: 'postcss',
                    //         postcssOptions: {
                    //             plugins:
                    //             [
                    //                 "postcss-preset-env",
                    //                 "autoprefixer",
                    //                 postcssNormalize(),
                    //             ],
                    //         },
                    //     },
                    // },
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },

            // {
            //     test: /\.m?jsx$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: [
            //                 ['@babel/preset-env', { "debug": true }],
            //                 '@babel/preset-react'
            //             ],
            //             plugins: ['react-refresh/babel']
            //         },
            //         exclude: path.join(__dirname, 'node_modules')
            //     }
            // },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                //     targets: { browsers: ["last 2 chrome versions"] },
                                useBuiltIns: "usage",
                                corejs: { version: 3, proposals: true },
                                debug: true,
                            },
                        ],
                        "@babel/preset-react",
                    ],
                    //plugins: ["react-refresh/babel"], // вешало всё
                },
                exclude: /node_modules/,
            },
        ],
    },
};
