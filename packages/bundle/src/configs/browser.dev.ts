import webpack from "webpack"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import HtmlHarddiskPlugin from "html-webpack-harddisk-plugin"
import HtmlPlugin from "html-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { CleanTerminalPlugin } from "./plugins/CleanTerminalPlugin"

// This does not have types so must be imported like this
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactRefreshBabel = require("react-refresh/babel")

import { BROWSER_TARGETS } from "./targets"

export interface BrowserBundleDevOptions {
	paths: {
		/**
		 * The ts entry file
		 */
		entry: string
		/**
		 * The index.html file
		 */
		indexHtml: string
		/**
		 *
		 */
		tsconfig: string
		/**
		 * The output folder
		 */
		output: string
	}
	/**
	 * Define any constants you want to replace during bundling.
	 */
	defines?: Record<string, any>
	/**
	 * Specify targets used by `@babel/preset-env` when bundling.
	 * @defaults `BROWSER_TARGETS`
	 */
	targets?: any
}

const PORT = 3010

export default async (options: BrowserBundleDevOptions) => {
	const { paths, defines = {} } = options
	const targets = options.targets ?? BROWSER_TARGETS

	const config: webpack.Configuration = {
		mode: "development",
		target: "web",
		devtool: "source-map",

		devServer: {
			compress: true,
			contentBase: paths.output,
			// clientLogLevel: "none",
			// quiet: true,

			historyApiFallback: true,
			hot: true,
			https: true,
			overlay: true,
			inline: true,
			writeToDisk: true,
			port: PORT,
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		},

		entry: [paths.entry],

		output: {
			filename: "js/[name]-[contenthash].js",
			chunkFilename: "js/[name]-chunk-[contenthash].js",
			publicPath: `https://localhost:${PORT}/`, // The last / is critical, without it hot-reloading breaks
			path: paths.output
		},

		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx"],
			plugins: [
				new TsConfigPathsPlugin({
					configFile: paths.tsconfig
				})
			]
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("development"),
				"process.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
				...defines
			}),
			new HtmlHarddiskPlugin(),
			new HtmlPlugin({
				template: paths.indexHtml,
				alwaysWriteToDisk: true,
				minify: false
			}),
			new webpack.HotModuleReplacementPlugin(),
			new ReactRefreshWebpackPlugin(),
			new ForkTsCheckerPlugin({
				async: true,
				typescript: {
					configFile: paths.tsconfig
				}
			}),
			new CleanTerminalPlugin({ message: "Recompiling..." })
		],

		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.[jt]sx?$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								babelrc: false,
								presets: [
									[
										"@babel/preset-env", // Adds dynamic imports of the necessary polyfills (see .browserslistrc for spec)
										{
											useBuiltIns: "usage",
											corejs: { version: 3, proposals: true },
											debug: false,
											targets
										}
									],
									[
										"@babel/preset-typescript",
										{
											onlyRemoveTypeImports: true
										}
									],
									"@babel/preset-react"
								],
								plugins: [
									"@babel/plugin-syntax-jsx",
									["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
									["@babel/plugin-proposal-class-properties", { loose: true }],
									["@babel/plugin-proposal-private-methods", { loose: true }],
									"@babel/plugin-transform-runtime",
									ReactRefreshBabel
								]
							}
						}
					]
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource"
				}
			]
		}
	}

	return config
}
