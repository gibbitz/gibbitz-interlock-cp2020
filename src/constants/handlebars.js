import { generatePartialPath } from "../utils/sheet-paths.js"

/**
 * path constants for preloading handlebars templates
 * using a utility to generate these to centralize pathing for ease of refactoring
 * see { @link generatePartialPath } for information on filenames and paths
*/
export const INPUT_PARTIAL_PATH = generatePartialPath('cp2020-input')
export const INPUT_BUTTON_PARTIAL_PATH = generatePartialPath('cp2020-input-button')
export const CHECKBOX_PARTIAL_PATH = generatePartialPath('cp2020-checkbox')
export const SELECT_PARTIAL_PATH = generatePartialPath('cp2020-select')
export const TEXTAREA_PARTIAL_PATH = generatePartialPath('cp2020-textarea')
export const CYBERDECK_PARTIAL_PATH = generatePartialPath('cyberdeck', 'Items')
export const SKILL_PARTIAL_PATH = generatePartialPath('skill', 'Items')
export const WEAPON_PARTIAL_PATH = generatePartialPath('weapon', 'Items')
export const CYBERWEAR_PARTIAL_PATH = generatePartialPath('cyberwear', 'Items')
export const OUTFIT_PARTIAL_PATH = generatePartialPath('outfit', 'Items')
export const PROGRAM_PARTIAL_PATH = generatePartialPath('program', 'Items')
export const VEHICLE_PARTIAL_PATH = generatePartialPath('vehicle', 'Items')
export const STAT_PARTIAL_PATH = generatePartialPath('stat', 'EdgeRunner')
export const BIO_PARTIAL_PATH = generatePartialPath('bio', 'EdgeRunner', 'bio')
export const LIFEPATH_PARTIAL_PATH = generatePartialPath('lifepath', 'EdgeRunner', 'bio')
export const FAMILY_PARTIAL_PATH = generatePartialPath('family', 'EdgeRunner', 'bio')
export const SIBLINGS_PARTIAL_PATH = generatePartialPath('siblings', 'EdgeRunner', 'bio')
export const IDENTITY_PARTIAL_PATH = generatePartialPath('identity', 'EdgeRunner')
export const STYLE_PARTIAL_PATH = generatePartialPath('style', 'EdgeRunner')
export const MOTIVATIONS_PARTIAL_PATH = generatePartialPath('motivations', 'EdgeRunner')
export const VALUES_PARTIAL_PATH = generatePartialPath('values', 'EdgeRunner')
export const PORTRAIT_PARTIAL_PATH = generatePartialPath('portrait', 'EdgeRunner')

/**
 * Array of partials templates used to preload templates and generate helpers
 * this design keeps filepaths out of handlebars templates and makes templates
 * more portable
 */
export const HBS_TEMPLATES = [
  INPUT_PARTIAL_PATH,
  INPUT_BUTTON_PARTIAL_PATH,
  CHECKBOX_PARTIAL_PATH,
  SELECT_PARTIAL_PATH,
  TEXTAREA_PARTIAL_PATH,
  STAT_PARTIAL_PATH,
  SKILL_PARTIAL_PATH,
  CYBERDECK_PARTIAL_PATH,
  CYBERWEAR_PARTIAL_PATH,
  OUTFIT_PARTIAL_PATH,
  PROGRAM_PARTIAL_PATH,
  VEHICLE_PARTIAL_PATH,
  WEAPON_PARTIAL_PATH,
  BIO_PARTIAL_PATH,
  LIFEPATH_PARTIAL_PATH,
  FAMILY_PARTIAL_PATH,
  SIBLINGS_PARTIAL_PATH,
  IDENTITY_PARTIAL_PATH,
  STYLE_PARTIAL_PATH,
  VALUES_PARTIAL_PATH,
  MOTIVATIONS_PARTIAL_PATH,
  PORTRAIT_PARTIAL_PATH
]