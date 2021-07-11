import path from "path"
import fs from "fs-extra"

import { NodeBundleDevOptions, nodeBundleProd } from "@radtools/bundle/src/nodeBundle"
import { createLogger } from "utilities/src/simpleLogger"

const { log, error } = createLogger("worker-osu-event-tracker build", {
	useColors: true
})

const start = async () => {
	log("Starting build!")

	log("Ensure dist folder exists!")
	const buildDirectory = path.resolve(__dirname, "../dist")

	if (!fs.existsSync(buildDirectory)) {
		fs.ensureDirSync(buildDirectory)
	}

	log("Pack and bundle the thing!")
	const config: NodeBundleDevOptions = {
		paths: {
			entry: path.resolve(__dirname, "../src/index.ts"),
			output: path.resolve(__dirname, "../dist"),
			tsconfig: path.resolve(__dirname, "../tsconfig.json"),
			statsOutput: path.resolve(__dirname, "../.stats")
		}
	}

	await nodeBundleProd(config)
}

start().catch((err) => {
	error(err)
})
