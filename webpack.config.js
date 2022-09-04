const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

const HtmlWebpackPlugin = require("html-webpack-plugin");

const main = {
    entry: path.resolve(appDirectory, "src/App.ts"),
    // entry: "./src/App.ts",
    output: {
        filename: "main-[contenthash].js",
        path: path.resolve(__dirname, "./dist"),
        // clean: true,
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
            {
                test: /\.glb$/,
                type: 'asset/resource',
                generator: {
                    publicPath: "assets/",
                    outputPath: "assets/",
                },
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
    // entry: "./src/Worker.ts",
    output: {
        filename: 'worker-[contenthash].js',
        path: path.resolve(__dirname, "./dist"),
        // clean: true,
    },
    plugins: [new HtmlWebpackPlugin(
        {
            inject: true,
        })],
    target: "webworker",
    devtool: "source-map",
    mode: "development",
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: [".tsx", ".ts", ".js"],
        // plugins: [
        //     new HtmlWebpackPlugin({
        //         inject: true,
        //         template: path.resolve(appDirectory, "public/index.html"),
        //     }),
        // ],
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
                test: /\.glb$/,
                type: 'asset/resource',
                generator: {
                    publicPath: "assets/",
                    outputPath: "assets/",
                },
            },
        ],
    },
}

module.exports = [
    main,
    worker,
];