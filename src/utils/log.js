/**
 * wrapper for console.log to control output chatter via configuration
 * @param  {...any} args logging payload
 * @returns undefined
 */
export const systemLog = (...args) =>
  console.log('cp2020 |', ...args)

/**
* wrapper for console.warn to control output chatter via configuration
* @param  {...any} args warn logging payload
* @returns undefined
*/
export const systemWarn = (...args) =>
  console.warn('cp2020 |', ...args)

/**
* wrapper for console.error to control output chatter via configuration
* @param  {...any} args error logging payload
* @returns undefined
*/
export const systemError = (...args) =>
  console.error('cp2020 |', ...args)