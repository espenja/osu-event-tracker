import webpack from "webpack"
import path from "path"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { NODE_TARGETS } from "./targets"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import CopyWebpackPlugin from "copy-webpack-plugin"

export interface NodeBundleDevOptions {
	paths: {
		/**
		 * The ts entry file
		 */
		entry: string
		/**
		 *
		 */
		tsconfig: string
		/**
		 * The output folder
		 */
		output: string
		/**
		 * The output folder for stats. If not specified will use `{output}../.stats`
		 */
		statsOutput?: string
	}
	/**
	 * Define any constants you want to replace during bundling.
	 */
	defines?: Record<string, any>
	/**
	 * Optional configuration for copy-webpack-plugin if you want to copy files to the output directory.
	 */
	copyPluginOptions?: ConstructorParameters<typeof CopyWebpackPlugin>[0]
}

export default async (options: NodeBundleDevOptions) => {
	const { paths, defines = {} } = options
	const statsOutput = paths.statsOutput ?? path.resolve(paths.output, "../.stats")
	const config: webpack.Configuration = {
		mode: "production",
		target: "node",
		devtool: "source-map",

		entry: [paths.entry],

		node: {
			__dirname: false
		},

		ignoreWarnings: [
			/critical dependency: the request of a dependency is an expression/i, // Ignore expression dependencies as they are used by express.js view library
			/can't resolve 'applicationinsights-native-metrics'/i, // Ignore appInsights optional dependency warning
			/can't resolve '@opentelemetry\/tracing'/i, // Ignore appInsights optional dependency warning
			/can't resolve '@opentelemetry\/api'/i, // Ignore appInsights optional dependency warning
			/require.extensions is not supported by webpack/i, // Ignore warning when bundling handlebars (dependency of TSOA)
			/Though the "loose" option was set to "false" in your @babel\/preset-env config/i
		],

		output: {
			filename: "index.js",
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

		optimization: {
			splitChunks: false,
			runtimeChunk: false,
			minimize: false
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("production"),
				"process.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
				...defines
			}),
			new ForkTsCheckerPlugin({
				async: true,
				typescript: {
					configFile: paths.tsconfig
				}
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				reportFilename: path.resolve(statsOutput, "./report.html"),
				openAnalyzer: false
			}),
			options.copyPluginOptions ? new CopyWebpackPlugin(options.copyPluginOptions) : undefined
		].filter(Boolean) as webpack.Configuration["plugins"], // Removes any undefined plugin entries

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
											targets: NODE_TARGETS
										}
									],
									[
										"@babel/preset-typescript",
										{
											onlyRemoveTypeImports: true
										}
									]
								],
								plugins: [
									"babel-plugin-const-enum",
									["@babel/plugin-proposal-decorators", { legacy: true }], // Handles decorators like those required for tsoa
									"babel-plugin-parameter-decorator", // Handles parameter decorators like those required for tsoa
									["@babel/plugin-proposal-class-properties", { loose: true }]
								]
							}
						}
					]
				}
			]
		}
	}

	return config
}
