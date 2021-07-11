interface CleanTerminalPluginOptions {
	/**
	 * Message to be printed
	 */
	message?: string
	/**
	 * Only clear the screen if webpack is in watch mode
	 * @default true
	 */
	onlyInWatchMode?: boolean
	/**
	 * Don't clear the screen on first webpack run
	 * @default true
	 */
	skipFirstRun?: boolean
	/**
	 * Clear screen before compiling instead of after (v3 and above)
	 * @default true
	 */
	beforeCompile?: boolean
}

const defaultOptions = (options: CleanTerminalPluginOptions) => ({
	onlyInWatchMode: true,
	skipFirstRun: true,
	beforeCompile: true,
	...options
})

/**
 * Clears the terminal between dev server compilations.
 *
 * Code borrowed from:
 * https://github.com/danillouz/clean-terminal-webpack-plugin#readme

MIT License

Copyright (c) 2017 Daniël Illouz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
export class CleanTerminalPlugin {
	public readonly options: CleanTerminalPluginOptions
	public firstRun = true

	public constructor(options: CleanTerminalPluginOptions = {}) {
		this.options = defaultOptions(options)
	}

	public apply(compiler: any) {
		let hook = compiler.hooks.afterCompile
		if (this.options.beforeCompile) {
			hook = compiler.hooks.beforeCompile
		}
		hook.tap("CleanTerminalPlugin", () => {
			if (this.shouldClearConsole(compiler)) {
				this.clearConsole()
			}
		})
	}

	public shouldClearConsole(compiler: any) {
		if (this.firstRun) {
			this.firstRun = false

			if (this.options.skipFirstRun) {
				return false
			}
		}

		if (this.options.onlyInWatchMode) {
			return Boolean(compiler.watchMode)
		}

		const isNodeEnvProduction = process.env.NODE_ENV === "production"
		const isOptionsModeProduction = Boolean(compiler.options && compiler.options.mode === "production")

		return !isNodeEnvProduction && !isOptionsModeProduction
	}

	public clearConsole() {
		const clear = "\x1B[2J\x1B[3J\x1B[H"
		const output = this.options.message ? `${clear + this.options.message}\n\n` : clear
		process.stdout.write(output)
	}
}
