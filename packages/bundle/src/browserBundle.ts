import webpack from "webpack"
import devConfig, { BrowserBundleDevOptions } from "./configs/browser.dev"
import prodConfig, { BrowserBundleProdOptions } from "./configs/browser.prod"
import fs from "fs-extra"
import WebpackDevServer from "webpack-dev-server"

/**
 * Starts the browser dev-tool for webpack.
 * @param options
 */
export const browserBundleDev = async (options: BrowserBundleDevOptions) => {
	console.log("Options", JSON.stringify(options, null, 2))

	console.log(`Clearing output directory "${options.paths.output}"`)
	await fs.emptyDir(options.paths.output)

	const configuration = await devConfig(options)
	const server = new WebpackDevServer(webpack(configuration), configuration.devServer)
	const port = configuration.devServer!.port ?? 3010
	console.log(`Server starting @ https://localhost:${port}`)
	server.listen(port, (err) => {
		if (err) {
			console.error(err.message, err.stack)
			process.exit(1)
		}
	})
}

export const browserBundleProd = async (options: BrowserBundleProdOptions) => {
	console.log("Options", JSON.stringify(options, null, 2))

	console.log(`Clearing output directory "${options.paths.output}"`)
	await fs.emptyDir(options.paths.output)

	const configuration = await prodConfig(options)
	const result = await new Promise((resolve, reject) => {
		webpack(configuration).run((err: any, stats: any) => {
			if (err) {
				console.warn(`Server errors during build`)
				reject(err)
				return
			}

			const statsJson = stats?.toJson()
			if (stats?.hasErrors()) {
				console.error(`Server errors during webpack build`)
				console.log(
					stats.toString({
						colors: true
					})
				)
				reject(statsJson?.errors)
				return
			}
			if (stats?.hasWarnings()) {
				console.warn(`Server warnings during build`)
				console.log(
					stats?.toString({
						colors: true
					})
				)
			}

			resolve(stats)
		})
	})

	console.log(`
Final output written to: ${options.paths.output}
`)

	return result
}
