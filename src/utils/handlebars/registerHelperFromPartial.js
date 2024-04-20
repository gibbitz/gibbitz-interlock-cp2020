import { generatePartialPath, getPartialNameFromPath } from '../sheet-paths'
import cp2020Log from './cp2020Log'

/**
 * registers a handlebars helper function given the helper name and optionally the parent and/or sub-folders where the partial lives
 * @param {string} partialName handlebars helper function's name
 * @param  {...string} [pathArgs] shorthand for parent and sub-folder params from generatePartialPath's signature
 * @returns null
 */
export const registerHelperFromPartial = (partialName, ...pathArgs) =>
  registerHelperFromPartialPath(partialName, generatePartialPath(partialName, ...pathArgs))

/**
 * registers a handlebars helper function from a partial given the helper name and the complete path to the partial file
 * @param {string} partialName the helper name to register -- this is generally the partial filename minus `-partial.hbs`
 * @param {string} partialPath the path to the partial file
 * @returns null
 */
export const registerHelperFromPartialPath = (partialName, partialPath) =>
  cp2020Log('-- partial path --', partialPath) ||
  Handlebars.registerHelper(
    partialName,
    (context, options) => new Handlebars.SafeString(
      Handlebars.partials[partialPath](context?.hash || context)
    )
  )

/**
 * registers Helpers from an array of partial paths deriving the name from the filename minus `-partial.hbs`
 * @param {Array<String>} paths array of paths to partial templates named with the `-parital.hbs` suffix
 * @returns null
 */
export const registerHelperFromPartialPaths = (paths) =>
  paths.forEach((path) => cp2020Log('registering: ', getPartialNameFromPath(path)) || registerHelperFromPartialPath(getPartialNameFromPath(path), path))
