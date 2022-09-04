const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

const main = {
    entry: path.resolve(appDirectory, "src/App.ts"), //path to the main .ts file
    output: {
        filename: "js/bundleName.js", //name for the js file that is created/compiled in memory
        clean: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080, //port that we're using for local host (localhost:8080)
        static: path.resolve(appDirectory, "public"), //tells webpack to serve from the public folder
        hot: true,
        devMiddleware: {
            publicPath: "/",
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        })
    ],
    mode: "development",
    devtool: "source-map",
};

const worker = {
    entry: path.resolve(appDirectory, "src/Worker.ts"),
    output: {
        filename: 'js/worker.bundleName.js',
        clean: true,
        // path: path.resolve(__dirname, 'dist'),
        // publicPath: "dist/"
    },
    target: "webworker",
    devtool: "source-map",
    mode: "development",
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: [
            '.js',
            '.ts',
            '.tsx'
        ],
        plugins: [
            // new HtmlWebpackPlugin({
            //     inject: true,
            //     template: path.resolve(appDirectory, "public/index.html"),
            // }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.(glb|gltf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]?[hash]",
                            // outputPath: 'assets/models/'
                        },
                    },
                ],
                type: "javascript/auto",
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    },
                ],
                type: 'javascript/auto',
            },
        ],
    },
}

module.exports = [main, worker];