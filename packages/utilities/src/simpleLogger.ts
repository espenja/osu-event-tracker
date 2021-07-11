import colors, { Color } from "colors"
import { log as clog, error as cerror, warn as cwarn } from "console"

export type SimpleLogger = (message?: any, obj?: any, optionsOverride?: SimpleLoggerOptions) => void
export type SimpleLoggerOptions = {
	useLoggerName?: boolean
	useTimestamps?: boolean
	doLog?: boolean
	useColors?: boolean
	dateStringOverride?: () => string
	objFormatter?: (obj: any) => string
}

export const createLogger = (name: string, options?: SimpleLoggerOptions) => {
	const loggerOptions = {
		useLoggerName: true,
		useTimestamps: true,
		doLog: true,
		useColors: false,
		...options
	} as SimpleLoggerOptions

	const write = (
		logger: typeof clog | typeof cerror | typeof cwarn,
		color: Color,
		message?: string,
		obj?: any,
		optionsOverride?: SimpleLoggerOptions
	) => {
		if (!loggerOptions.doLog) return

		const useOptions = { ...loggerOptions, ...optionsOverride }

		const messageStr = message
		const nameStr = useOptions.useLoggerName ? `${name}: ` : ""
		const objStr = useOptions.objFormatter ? useOptions.objFormatter(obj) : obj
		const timeStampStr = useOptions.useTimestamps
			? `${useOptions.dateStringOverride ? useOptions.dateStringOverride() : new Date().toLocaleTimeString()} -> `
			: ""

		if (useOptions.useColors) {
			if (objStr) {
				logger(`${color.green(timeStampStr)}${color(nameStr)}: ${messageStr}`, objStr)
			} else {
				logger(`${color.green(timeStampStr)}${color(nameStr)}: ${messageStr}`)
			}
		} else {
			if (objStr) {
				logger(`${timeStampStr}${nameStr}: ${messageStr}`, obj)
			} else {
				logger(`${timeStampStr}${nameStr}: ${messageStr}`)
			}
		}
	}

	const log: SimpleLogger = (message, obj?, optionsOverride?) => {
		write(console.log, colors.blue, message, obj, optionsOverride)
	}

	const error: SimpleLogger = (message, obj?, optionsOverride?) => {
		write(console.error, colors.red, message, obj, optionsOverride)
	}

	const warn: SimpleLogger = (message, obj?, optionsOverride?) => {
		write(console.warn, colors.yellow, message, obj, optionsOverride)
	}

	return { log, error, warn }
}
