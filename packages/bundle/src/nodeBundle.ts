import webpack from "webpack"
import prodConfig, { NodeBundleDevOptions } from "./configs/node.prod"
import fs from "fs-extra"
export { NodeBundleDevOptions }

export const nodeBundleProd = async (options: NodeBundleDevOptions) => {
	console.log("Options", JSON.stringify(options, null, 2))

	console.log(`Clearing output directory "${options.paths.output}"`)
	await fs.emptyDir(options.paths.output)

	const configuration = await prodConfig(options)
	const result = await new Promise((resolve, reject) => {
		webpack(configuration).run((err, stats) => {
			if (err) {
				console.warn(`Server errors during build`)
				reject(err)
				return
			}

			const statsJson = stats?.toJson(typeof configuration.stats === "object" ? configuration.stats : {})
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
