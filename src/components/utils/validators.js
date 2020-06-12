export const required = (value) => {
	if (value) return undefined
	return "this is required field"
}

export const minLength = min => value => {
	if (value.length < min) return `min length is ${min} symbols`
	return undefined
}
