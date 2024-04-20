import { SYSTEM_NAME } from '../constants/system'
import cp2020Log from './handlebars/cp2020Log'

/**
 * utility to generate a path to a sheet given the parent folder and sheet-prefix (filename minus `-sheet.hbs`)
 * @param {string} sheetFilePrefix
 * @param {string} sheetFolder
 * @returns {string} path to sheet handlebars template
 */
export const generateSheetPath = (sheetFilePrefix, sheetFolder) => {
  const path = `systems/${SYSTEM_NAME}/templates/${sheetFolder || sheetFilePrefix}/${sheetFilePrefix}-sheet.hbs`
  cp2020Log(`INIT :: SHEET :: ${path}`)
  return path
}

/**
 * utility to generate a path to a partial given the partial prefix, parent and subfolder names of the partials folder
 * @param {string} partialFilePrefix partial name used in handlebars this gets `-partial.hbs` appended for the filename
 * @param {string} sheetFolder parent sheet folder where partials folder will house the partial
 * @param {string} partialSubFolder directory in the partials folder where the partial file lives
 * @returns {string} path to partial handlebars template
 */
export const generatePartialPath = (partialFilePrefix, sheetFolder, partialSubFolder) => {
  const path = `systems/${SYSTEM_NAME}/templates/${sheetFolder ? sheetFolder + '/' : ''}partials/${partialSubFolder ? partialSubFolder + '/' : ''}${partialFilePrefix}-partial.hbs`
  cp2020Log(`INIT :: PARTIAL :: ${path}`)
  return path
}

/**
 * utility to get a string name for partials (partialFilePrefix) using a regexp
 * @param {string} path a filepath that ends in a partial named with `-partial.hbs` suffix
 * @returns {string} name of partial -- the filename without the `-partial.hbs`
 */
export const getPartialNameFromPath = (path) => /[\w-]+(?=-partial\.hbs$)/.exec(path)
