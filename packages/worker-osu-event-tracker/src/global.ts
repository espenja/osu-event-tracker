let requestCounter = 0
export let nextRequestCounter = () => ++requestCounter
export let getRequestCounter = () => requestCounter
export let now = () => new Date().toISOString()
