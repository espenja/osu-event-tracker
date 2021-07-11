export interface RequiredHandler {
	<T = string>(key: string | Array<string>): T
	<T = string, R = T>(key: string | Array<string>, formatter: Formatter<T, R>): R
}

export interface OptionalHandler {
	<T = string>(key: string | Array<string>): T
	<T = string, R = T>(key: string | Array<string>, defaultValue: R): R
	<T = string, R = T>(key: string | Array<string>, defaultValue: R, formatter: Formatter<T, R>): R
}

export type Formatter<T, R> = (value: T) => R

export type CustomErrorHandler = (missingRequired: Array<string>) => void | never

export type CustomValidator<Q> = (
	values: Q,
	missingKeys: Array<string>,
	keysMarkedRequired: Array<string>,
	errorHandler: CustomErrorHandler
) => void

export type PickFromObjectOptions<Q> = {
	customErrorHandler?: CustomErrorHandler
	customValidator?: CustomValidator<Q>
	allowedDefaultValues: {
		undefined: boolean
		null: boolean
		emptyString: boolean
	}
}

const defaultErrorHandler: CustomErrorHandler = (missingRequired) => {
	throw new Error(`Missing required variables ${missingRequired.join(", ")}`)
}

const defaultValidator: CustomValidator<unknown> = (values, missingKeys, keysMarkedRequired, errorHandler) => {
	const missingRequired = missingKeys.filter((d) => keysMarkedRequired.includes(d))

	if (missingRequired.length) {
		errorHandler(missingRequired)
	}
}

const makeDefaultFormatters = <T extends Record<string, Formatter<never, unknown>>>(x: T): T => x

export const defaultFormatters = makeDefaultFormatters({
	isNot: (not: any) => (value: any) => value !== not,
	toInt: (value: string) => parseInt(value.toString()),
	toBoolean: (value: string) => value.toLowerCase() === "true"
})

export const pickFromObject = <Q>(
	obj: Record<string, any>,
	val: (req: RequiredHandler, optional: OptionalHandler) => Q,
	options?: PickFromObjectOptions<Q>
) => {
	const validator = options?.customValidator ?? defaultValidator
	const errorHandler = options?.customErrorHandler ?? defaultErrorHandler

	const keysMarkedRequired: Array<string> = []
	const missingKeys: Array<string> = []

	const findKey = <T, R>(key: string | Array<string>, required: boolean, formatter?: Formatter<T, R>): T | R => {
		const keyArray = Array.isArray(key) ? key : [key]
		const foundKey = keyArray.find((d) => obj[d])

		if (required) {
			keyArray.forEach((d) => keysMarkedRequired.push(d))
		}

		if (!foundKey || !obj[foundKey]) {
			keyArray.forEach((d) => missingKeys.push(d))
			return undefined as any
		}

		const value = obj[foundKey!]
		return formatter ? (formatter(value) as R) : (value as T)
	}

	const required: RequiredHandler = <T, R>(key: string | Array<string>, formatter?: Formatter<T, R>) => {
		return findKey(key, true, formatter)
	}

	function optional<T, R>(key: string | Array<string>, defaultValue?: R, formatter?: Formatter<T, R>) {
		const value = findKey(key, false, formatter)

		if (value || arguments.length === 1) {
			return value
		}

		return defaultValue
	}

	const values = val(required, optional)
	validator(values, missingKeys, keysMarkedRequired, errorHandler)

	return values
}
